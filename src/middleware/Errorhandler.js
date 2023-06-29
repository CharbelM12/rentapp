const expressvalidation=require('express-validation')
const  errorhandler=(error,req, res, next)=>{
        const status=error.status||500;
        const message=error.message || 'Internal Server Error';
        if (error instanceof expressvalidation.ValidationError ){
                res.status(400).json({message:error.message})
        }
        
         res.status(status).json({message:message})
}
module.exports=errorhandler;