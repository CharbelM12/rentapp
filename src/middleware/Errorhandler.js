const {validate}=require('express-validation')
const  errorhandler=(error,req, res, next)=>{
        const status=error.status||500;
        const message=error.message || 'Internal Server Error';
         res.status(status).json({message:message})
         if (error instanceof validate.ValidationError) {
                const errorMessages = err.details.map((detail) => detail.message);
                return res.status(400).json({ errors: errorMessages });
              }
            
        }
module.exports=errorhandler;