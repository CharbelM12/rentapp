const express=require('express');
const router=express.Router();
const CategoryController=require('./CategoryController');
const categorycontroller=new CategoryController();
const JoiValidation=require('../validations/validations');
const {validate}=require('express-validation');
const trycatch=require('../utils/trycatch');

router.get('/fetch',trycatch(categorycontroller.getCategories));

router.post('/create',validate(JoiValidation.createorupdateCategoryValidator),trycatch(categorycontroller.createCategory));
    
router.get('/', trycatch(categorycontroller.getCategory));
    
router.put('/edit',validate(JoiValidation.createorupdateCategoryValidator),trycatch(categorycontroller.updateCategory));
    
router.delete('/delete',trycatch(categorycontroller.deleteCategory));

module.exports=router;