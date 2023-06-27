const CarService=require('./CarService');
const carservice= new CarService();
const Errorhandler=require('../errors')

class CarController{
    async getCars(req, res, next){
          const result=await carservice.getCars()
          res.status(200).json({message:'Cars fetched', car:result})
          
     
    };
    async createCar(req, res, next){
           let reqbody=req.body;
          const result=await carservice.createCar(reqbody)
          res.status(201).json({message: 'Car created successfully!',car: result,});
         
  }
  async getCar(req, res, next) {
     let CarId=req.query.CarId;
     const result = await carservice.getCar(CarId);
      res.status(200).json({message:"car found",car:result})  
       
  }
  async updateCar(req, res, next){
     const CarId=req.query.CarId;
     let reqbody=req.body
      const result=await carservice.updateCar(CarId,reqbody)
      res.status(200).json({message:'car updated', car:result})

  }
  async deleteCar(req, res, next){
     const CarId=req.query.CarId;
     const result=await carservice.deleteCar(CarId);
     res.status(200).json({message:' Car deleted'})
     
  
  }
    
  }
  
  module.exports=CarController;



