const CategoryService=require('./CategoryService');
const categoryservice=new CategoryService();


class CategoryController{
  async getCategories(req, res, next){
        const result=await categoryservice.getCategories()
        res.status(200).json({message:'Categories fetched', category:result})
        
   
  };
  async createCategory(req, res, next){
         let reqbody=req.body;
        const result=await categoryservice.createCategory(reqbody)
            res.status(201).json({message: 'Category created successfully!',category: result,});
        
 
}
async getCategory(req, res, next) {
   let CategoryId=req.query.CategoryId;
   const result = await categoryservice.getCategory(CategoryId);
    res.status(200).json({message:"category found",category:result})
     
}
async updateCategory(req, res, next){
   const CategoryId=req.query.CategoryId;
   let reqbody=req.body
    const result=await categoryservice.updateCategory(CategoryId,reqbody)
    res.status(200).json({message:'Category updated', category:result})

}
async deleteCategory(req, res, next){
    const CategoryId=req.query.CategoryId;
    const result=await categoryservice.deleteCategory(CategoryId);
    res.status(200).json({message:'Deleted Brand'})
    
} 
}

module.exports=CategoryController;