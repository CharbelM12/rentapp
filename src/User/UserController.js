const UserService=require('./UserService');
const userservice=new UserService();
const Errorhandler=require('../errors');
class UserController{
    async signup(req, res, next){
        
        let reqbody=req.body
        const result=await userservice.signup(reqbody);
        return res.status(201).json({message: "User Created"})
    
         

        
    }
    async login(req, res, next){
        
        let reqbody=req.body
       const result= await userservice.login(reqbody)
        return res.status(200).json({token:result});
      
}
}

module.exports=UserController;