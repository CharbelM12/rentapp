const BrandService=require('./BrandService');
const brandservice=new BrandService();


class BrandController{
    
  async getBrands(req, res, next){
        const result=await brandservice.getBrands()
        res.status(200).json({message:'Brands  fetched', Brands:result})
  };
  async createBrand(req, res, next){
         let reqbody=req.body;
        const result=await brandservice.createBrand(reqbody)
        res.status(201).json({message: 'Brand was created successfully!',brand: result});
    
}
async getBrand(req, res, next) {
   let BrandId=req.query.BrandId;
   const result = await brandservice.getBrand(BrandId);
    res.status(200).json({message:"Brand found",brand:result})
   
     
    
}
async updateBrand(req, res, next){
   const  BrandId=req.query.BrandId;
   let reqbody=req.body;
    const result=await brandservice.updateBrand(BrandId,reqbody);
    res.status(200).json({message:'Brand updated', brand:result})
    
}
async deleteBrand(req, res, next){
    const BrandId=req.query.BrandId;
    const result=await brandservice.deleteBrand(BrandId);
    res.status(200).json({message:'Brand was deleted successfully'})
  
}
  
}

module.exports=BrandController;








