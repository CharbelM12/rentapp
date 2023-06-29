const Car =require('./CarModel');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const mongoose=require('mongoose');
const errorhandler=require('../errors');

class CarService{
    async getCars(){
       const result= await Car.find() 
         if(!result){
            throw {status:errorhandler["CarNotFound"].status , message: errorhandler["CarNotFound"].message}
         }  
         return result 
    };
    async createCar(reqbody){
        const name=reqbody.name
        const model=reqbody.model
        const Brand=reqbody.Brand
        const Category=reqbody.Category
        const car=new Car({
            name:name,
            model:model,
            Brand:Brand,
            Category:Category
            })
           const result =await car.save()
           if(!result){
            throw {status:errorhandler['InternalServerError'].status , message: errorhandler['InternalServerError'].message}
         }  
         return result   
        };
    async getCar(CarId){
        const car=await Car.aggregate([{
            $match:{ _id:new mongoose.Types.ObjectId(CarId)}
        },
        {
            $lookup:{
                from:"brands",
                localField:"Brand",
                foreignField:"_id",
                as:"Brand"
            }
        },
        {
            $lookup:{
                 from:"categories",
                 localField:"Category",
                 foreignField:"_id",
                as:"Category"
            }
        },
        {
            $unwind:"$Brand"
        },
        {
            $unwind:"$Category"
            
        },
        {
           $project:{
            name:1,
            model:1,
            Brand:{
                name:1  
            },
            Category:{
                name:1
             }
           } 
        }
    ])
    if (car && car.length >0){
        return car[0]   
    }else {
        throw {status:errorhandler['CarNotFound'].status , message: errorhandler['CarNotFound'].message}
    }    
    };
    async updateCar(CarId,reqbody){
      console.log(reqbody)
      const name=reqbody.name;
      const model=reqbody.model;
      const Brand=reqbody.Brand
      const Category=reqbody.Category
      const car=await Car.findById(CarId)
        if (!car){
          throw  {status:errorhandler["CarNotFound"].status , message: errorhandler["CarNotFound"].message}
        } 
        car.name=name
        car.model=model
        car.Brand=Brand
        car.Category=Category
        const result=await car.save();
        if(!result){
            throw {status:errorhandler['InternalServerError'].status , message: errorhandler['InternalServerError'].message}
         }  
         return result   
      }
    async deleteCar(CarId){
    const result= await Car.findByIdAndRemove( CarId)
    if (!result){
        throw {status:errorhandler["CarNotFound"].status , message: errorhandler["CarNotFound"].message}
      }
      return result
    
    }
}



module.exports=CarService;