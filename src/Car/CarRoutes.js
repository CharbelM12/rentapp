const express=require('express');
const router=express.Router();
const CarController= require('./CarController');
const carcontroller=new CarController();
const JoiValidation=require('../validations/validations');
const {validate}=require('express-validation');
const trycatch=require('../utils/trycatch');

router.get('/fetch',trycatch(carcontroller.getCars));

router.post('/create',validate(JoiValidation.createorupdateCarValidator),trycatch(carcontroller.createCar));
    
router.get('/', trycatch(carcontroller.getCar));
    
router.put('/edit',validate(JoiValidation.createorupdateCarValidator),trycatch(carcontroller.updateCar));
    
router.delete('/delete',trycatch(carcontroller.deleteCar));

module.exports=router;