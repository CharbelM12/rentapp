const  errorhandler=(error,req, res, next)=>{
        const status=error.status||500;
        const message=error.message || 'Internal Server Error';
        return res.status(status).json({message:message})
}
module.exports=errorhandler;