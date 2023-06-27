const express=require('express');
const router=express.Router();
const UserController = require('./UserController');
const usercontroller=new UserController();
const JoiValidation=require('../validations/validations');
const {validate}=require('express-validation');
const trycatch=require('../utils/trycatch')

router.put('/signup',validate(JoiValidation.signupvalidation),trycatch(usercontroller.signup));
    
router.post('/login',trycatch(usercontroller.login));

module.exports=router;