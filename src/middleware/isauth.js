const jwt =require('jsonwebtoken');
const errorhandler= require('../errors')

module.exports=(req, res, next)=>{
    const authHeader=req.get('Authorization');
    if (!authHeader){
        throw {status:errorhandler['NotAuthenticated'].status , message: errorhandler['NotAuthenticated'].message}; 
    }
    const token=req.get('Authorization').split(' ')[1];
    let decodedToken;
    try{
        decodedToken=jwt.verify(token,'somesupersecretsecret');
    }catch(err){
        throw {status:errorhandler['InternalServerError'].status , message: errorhandler['InternalServerError'].message}
    }
    if (!decodedToken){
        throw {status:errorhandler['NotAuthenticated'].status , message: errorhandler['NotAuthenticated'].message}
    }
    req.userId=decodedToken.userId;
    next();
};