const Brand =require('./BrandModel');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const errorhandler=require('../errors');
class BrandService{
    async getBrands(){
         const brand=await  Brand.find() 
         if (!brand){
            throw {status:errorhandler['BrandNotFound'].status,message: errorhandler['BrandNotFound'].message}
         }   
         return brand
    };
    async createBrand(reqbody){
        const name=reqbody.name
        const Country=reqbody.Country
        const foundedyear =reqbody.foundedyear 
        const  alreadyexists =await Brand.findOne({ name: name })
        if (alreadyexists){
             throw {status:errorhandler['NameExists'].status,message: errorhandler['NameExists'].message}
        }
        const brand=new Brand({
            name:name,
            Country:Country,
            foundedyear: foundedyear
            })
            
            const result= await brand.save()
            if(!result){
                throw {status:errorhandler['InternalServerError'].status,message: errorhandler['InternalServerError'].message}
            }
            return result   
        }
    async getBrand(BrandId){
        const brand=await Brand.findById(BrandId)
        if (!brand){
        throw  {status:errorhandler['BrandNotFound'].status,message: errorhandler['BrandNotFound'].message}
        }
        return brand   
    };
    async updateBrand(BrandId,reqbody){
      console.log(reqbody)
      const name=reqbody.name;
      const Country=reqbody.Country;
      const foundedyear=reqbody.foundedyear
      const brand=await Brand.findById(BrandId)
        if (!brand){
            throw {status:errorhandler['BrandNotFound'].status,message: errorhandler['BrandNotFound'].message}
        }
        brand.name=name;
        brand.Country=Country;
        brand.foundedyear=foundedyear;
        const result= await brand.save();
        if (!result){
            throw {status:errorhandler['InternalServerError'].status,message: errorhandler['InternalServerError'].message}
        }
        return result
      }
    async deleteBrand(BrandId){
 const brand= await Brand.findByIdAndRemove(BrandId)
    if (!brand){
        throw  {status:errorhandler['BrandNotFound'].status,message: errorhandler['BrandNotFound'].message}
    }
   return brand;
    }
}
module.exports=BrandService;