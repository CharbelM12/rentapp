const express=require('express');
const router=express.Router();
const UserController = require('./UserController');
const usercontroller=new UserController();
const JoiValidation=require('../validations/validations');
const {validate,ValidationError}=require('express-validation');
const trycatch=require('../utils/trycatch')
const errorHandler = (err, req, res, next) => {
    if (err && err instanceof validate.ValidationError) {
      // Handle express-validation errors
      const errorMessages = err.details.map((detail) => detail.message);
      return res.status(400).json({ errors: errorMessages });
    } else if (err && err.isJoi) {
      // Handle joi validation errors
      const errorMessages = err.details.map((detail) => detail.message);
      return res.status(400).json({ errors: errorMessages });
    }
  
    return next(err);
  };
router.put('/signup',validate(JoiValidation.signupvalidation),trycatch(usercontroller.signup));
    
router.post('/login',trycatch(usercontroller.login));

module.exports=router;