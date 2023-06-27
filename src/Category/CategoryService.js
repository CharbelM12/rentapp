const Category =require('./CategoryModel');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const mongoose=require('mongoose');
const errorhandler=require('../errors');

class CategoryService{
    async getCategories(){
         const result= await Category.find() 
         if (!result){
            throw {status:errorhandler['CategoryNotFound'].status , message: errorhandler['CategoryNotFound'].message}
          }  
          return result 
    };
    async createCategory(reqbody){
        const name=reqbody.name
        const description=reqbody.description
        const seatingcapacity =reqbody.seatingcapacity
        const Brand=reqbody.Brand
        const category=new Category({
            name:name,
            description:description,
            seatingcapacity: seatingcapacity,
            Brand:Brand
            }) 
            const result= await category.save()
            if (!result){
                throw {status:errorhandler['InternalServerError'].status , message: errorhandler['InternalServerError'].message}
              }
              return result  
        };
    async getCategory(CategoryId){
        const category=await Category.aggregate([{
            $match:{ _id:new mongoose.Types.ObjectId(CategoryId)}
        },
        {
            $lookup:{
                from:"brands",
                localField:"Brand",
                foreignField:"_id",
                as:"Brand"
            },
        },
        {
            $unwind:"$Brand"
        },
        {
           $project:{
            name:1,
            description:1,
            seatingcapacity:1,
            Brand:{
                name:1  
            }  
           } 
        }
    ])
    if (category && category.length >0){
        return category[0]   
    }else {
        throw {status:errorhandler['CategoryNotFound'].status , message: errorhandler['CategoryNotFound'].message}
    }  
    };
    async updateCategory(CategoryId,reqbody){
      console.log(reqbody)
      const name=reqbody.name;
      const description=reqbody.description;
      const seatingcapacity=reqbody.seatingcapacity;
      const Brand=reqbody.Brand
      const category=await Category.findById(CategoryId)
        if (!category){
          throw {status:errorhandler['CategoryNotFound'].status , message: errorhandler['CategoryNotFound'].message}
        }
      
        category.name=name;
        category.description=description;
        category.seatingcapacity=seatingcapacity;
        category.Brand=Brand
        const result= await category.save();
        if (!result){
            throw {status:errorhandler['InternalServerError'].status , message: errorhandler['InternalServerError'].message}
          }
          return result
      }
    async deleteCategory(CategoryId){
    const result=await Category.findByIdAndRemove( CategoryId)
    if (!result){
      throw {status:errorhandler['CategoryNotFound'].status , message: errorhandler['CategoryNotFound'].message}
    }
    return result;
 
    }
}



module.exports=CategoryService;