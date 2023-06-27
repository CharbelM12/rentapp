const Reservation =require('./ReservationModel');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const mongoose=require('mongoose');
const User=require('../User/UserModel');
const errorhandler=require('../errors');
class ReservationService{
    async getReservations(){
         const result= await Reservation.find().populate('driver') 
         if (result.length===0){
            throw {status:errorhandler['ReservationNotFound'].status , message: errorhandler['ReservationNotFound'].message}
          }  
          return result  
    };
    async createReservation(reqbody,userId){
        const CarId=reqbody.CarId
        const startdate =reqbody.startdate
        const enddate = reqbody.enddate
        const user = await User.findById(userId);
        if (!user) {
            throw {status:errorhandler['UserNotFound'].status , message: errorhandler['UserNotFound'].message}
        }
        const reservation = await Reservation.findOne({
         car:CarId,
          $or: [
            { startdate: { $lt: enddate }, enddate: { $gt: startdate } },
            { startdate: { $gte: startdate, $lt:enddate } }
         ]
        })
        if (!reservation) {
            if (user.rentedcars ===3){
                throw {status:errorhandler['NotAuhtorized'].status , message: errorhandler['NotAuhtorized'].message}
                }
        
            const newreservation = new Reservation({
                  startdate:startdate,
                  enddate:enddate,
                  driver:userId, 
                  car:CarId
                });
                const result= await newreservation.save();
                if(!result){
                    throw {status:errorhandler['InternalServerError'].status , message: errorhandler['InternalServerError'].message}
                   }
                const userr=await User.findOneAndUpdate({_id:userId},
                    {$inc:{
                       rentedcars:1 
                }},
                {new :true})
                if(!userr){
                 throw {status:errorhandler['InternalServerError'].status , message: errorhandler['InternalServerError'].message}
                }
                return result;  
        }
        throw {status:errorhandler['CarReserved'].status , message: errorhandler['CarReserved'].message}; 
        
        };
    async getReservation(ReservationId){
        const reservation=await Reservation.aggregate([{
            $match:{ _id:new mongoose.Types.ObjectId(ReservationId)}
        },
        {
            $lookup:{
                from:"users",
                localField:"driver",
                foreignField:"_id",
                as:"driver"
            }
        },
        {
            $lookup:{
                 from:"cars",
                 localField:"car",
                 foreignField:"_id",
                as:"car"
            }
        },
        {
            $unwind:"$driver"
        },
        {
            $unwind:"$car"
            
        },
        {
           $project:{
            name:1,
            model:1,
            driver:{
                name:1  
            },
            car:{
                name:1
             }
           } 
        }
    ])
    if (reservation && reservation.length >0){
        return reservation[0]   
    }else {
        throw {status:errorhandler['ReservationNotFound'].status , message: errorhandler['ReservationNotFound'].message}
    } 
    };
    async updateReservation(ReservationId,reqbody,userId){
        const CarId=reqbody.CarId
        const startdate =reqbody.startdate
        const enddate = reqbody.enddate
      const reservation=await Reservation.findById(ReservationId)
        if (!reservation){
            throw {status:errorhandler['ReservationNotFound'].status , message: errorhandler['ReservationNotFound'].message}
        }
        if (reservation.driver.toString()!==userId){
          throw {status:errorhandler['NotAuthenticated'].status , message: errorhandler['NotAuthenticated'].message}
        }
        reservation.startdate=startdate
        reservation.enddate=enddate
        reservation.car=CarId
        const result = await Reservation.findOne({
            car:CarId,
             $or: [
               { startdate: { $lt: enddate }, enddate: { $gt: startdate } },
               { startdate: { $gte: startdate, $lt:enddate } }
            ]
           })
        if (result){
            throw {status:errorhandler['CarReserved'].status , message: errorhandler['CarReserved'].message}; 
        }
        const results=await reservation.save();
        if(!results){
            throw {status:errorhandler['InternalServerError'].status , message: errorhandler['InternalServerError'].message}
        }
        return results
      }
    async deleteReservation(ReservationId,userId){
    const reservation= await Reservation.findById(ReservationId)
    if (!reservation){
        throw {status:errorhandler['ReservationNotFound'].status , message: errorhandler['ReservationNotFound'].message}
    }
    if (reservation.driver.toString()!==userId){
        throw {status:errorhandler['NotAuthenticated'].status , message: errorhandler['NotAuthenticated'].message}
    }
    const deleted= await Reservation.findByIdAndRemove( ReservationId)
    if(!deleted){
      throw {status:errorhandler['ReservationNotFound'].status , message: errorhandler['ReservationNotFound'].message}
    }
    const user=await User.findOneAndUpdate({_id:userId},
        {$inc:{
           rentedcars:-1 
    }},
    {new :true})
    if(!user){
        throw {status:errorhandler['UserNotFound'].status , message: errorhandler['UserNotFound'].message}
    }
     return deleted;
       
    };
    }




module.exports=ReservationService;