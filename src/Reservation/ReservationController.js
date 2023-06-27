const ReservationService=require('./ReservationsService');
const reservationservice=new ReservationService();

class ReservationController{
  async getReservations(req, res, next){
        const result=await reservationservice.getReservations()
        res.status(200).json({message:'Reservations fetched', reservation:result})
      
  };
  async createReservation(req, res, next){
         let reqbody=req.body;
         let userId=req.userId
        const result=await reservationservice.createReservation(reqbody,userId)
            res.status(201).json({message: 'Reservation created successfully!',reservation: result,});
        
 
}
async getReservation(req, res, next) {
   let ReservationId=req.query.ReservationId;
   const result = await reservationservice.getReservation(ReservationId);
    res.status(200).json({message:"Reservation found",reservation:result})
    
}
async updateReservation(req, res, next){
   const ReservationId=req.query.ReservationId;
   let reqbody=req.body
   let userId=req.userId
    const result=await reservationservice.updateReservation(ReservationId,reqbody,userId)
    res.status(200).json({message:'Reservation updated', reservation:result})

}
async deleteReservation(req, res, next){
    const ReservationId=req.query.ReservationId;
    let userId=req.userId
    const result=await reservationservice.deleteReservation(ReservationId,userId);
    res.status(200).json({message:'Deleted Reservation'})
    

}
  
}

module.exports=ReservationController;
