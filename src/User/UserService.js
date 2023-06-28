const User=require('./UserModel');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const errorhandler=require('../errors');

class UserService{
    async signup(reqbody){
        console.log(reqbody)
        const email=reqbody.email;
        const name=reqbody.name; 
        const password=reqbody.password;
        
        const hashedPw=await bcrypt.hash(password, 12)
        
            const user= new User({
                email:email,
                password:hashedPw,
                name:name
            })
            const result= await user.save();
            if(!result){
                throw {status:errorhandler['InternalServerError'].status , message: errorhandler['InternalServerError'].message}
            }
            return result
       
    }


async login(reqbody){
const email=reqbody.email;
const password=reqbody.password;
let loadedUser;

    const user=await User.findOne({email:email})
    if (!user){
      throw {status:errorhandler['EmailMissing'].status , message: errorhandler['EmailMissing'].message}
    }
    loadedUser=user;
    const isEqual=await bcrypt.compare(password, user.password)
         if (!isEqual){
           throw {status:errorhandler['IncorrectPassword'].status , message: errorhandler['IncorrectPassword'].message}
         }
         const token=  jwt.sign({
            email:loadedUser.email,
            userId:loadedUser._id.toString()
         },'somesupersecretsecret');
            if(!token){
                throw {status:errorhandler['InternalServerError'].status , message: errorhandler['InternalServerError'].message}
            }
            return token
}
}


module.exports=UserService;
    
