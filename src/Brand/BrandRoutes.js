const express=require('express');
const router=express.Router();
const BrandController=require('./BrandController');
const brandcontroller=new BrandController();
const JoiValidation=require('../validations/validations');
const {validate}=require('express-validation');
const trycatch=require('../utils/trycatch');

router.get('/fetch',trycatch(brandcontroller.getBrands));

router.post('/create',validate(JoiValidation.createorupdateBrandValidator),trycatch(brandcontroller.createBrand));
    
router.get('/', trycatch(brandcontroller.getBrand));
    
router.put('/edit',validate(JoiValidation.createorupdateBrandValidator),trycatch(brandcontroller.updateBrand));
    
router.delete('/delete',trycatch(brandcontroller.deleteBrand));

module.exports=router;