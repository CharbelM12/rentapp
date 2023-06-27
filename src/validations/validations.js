const Joi=require('joi');
Joi.objectId=require('joi-objectid')(Joi);
const User=require('../User/UserModel')
const Brand=require('../Brand/BrandModel');
const errorhandler=require('../errors');
let date=new Date();


const JoiValidation={

    signupvalidation:{
        body:Joi.object({
            email:Joi.string().trim().email().normalize().custom(async (value, { req }) => {
                const userDoc =await User.findOne({ email: value })
                  if (userDoc) {
                   throw {status:errorhandler['EmailExists'].status,message:errorhandler['EmailExists'].message};
                  }
                  return userDoc
              }).required(),
            password:Joi.string().trim().regex(/[a-zA-Z0-9]{5,30}/).required(),
            name:Joi.string().trim().required(),
            rentedcars:Joi.number()
    
        })
    },
    createorupdateCarValidator:{
        body: Joi.object({
            name:Joi.string().required(),   
            model:Joi.string().required(),
            Brand:Joi.objectId().required(),
            Category:Joi.objectId().required()
        })
    },

    createorupdateCategoryValidator:{
        body: Joi.object({
            name:Joi.string().required(),
            description:Joi.string().min(5).required(),
           seatingcapacity:Joi.number().min(2).required(),
           Brand:Joi.objectId().required()
        })
    },
    createorupdateBrandValidator:{
        body: Joi.object({
            name:Joi.string().custom(async (value, { req }) => {
                try{
                return await Brand.findOne({ name: value })
                }catch(error){
                    next({status:errorhandler['NameExists'].status,message: errorhandler['NameExists'].message})
                }
                  
              }).required(),
            Country:Joi.string().required(),
            foundedyear:Joi.number().min(1800).max(date.getFullYear()).required()
        })
    },
    createorupdateReservationValidator:{
        body: Joi.object({
           startdate:Joi.date().required(),
           enddate:Joi.date().required(),
           car:Joi.objectId().required()
        })
    },

};

module.exports=JoiValidation;
