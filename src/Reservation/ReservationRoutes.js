const express=require('express');
const router=express.Router();
const ReservationController=require('./ReservationController');
const reservationcontroller=new ReservationController();
const JoiValidation=require('../validations/validations');
const {validate}=require('express-validation');
const isAuth=require('../middleware/isauth');
const trycatch=require('../utils/trycatch');

router.get('/fetch',trycatch(reservationcontroller.getReservations));

router.post('/create',validate(JoiValidation.createorupdateReservationValidator),isAuth,trycatch(reservationcontroller.createReservation));

router.get('/',trycatch(reservationcontroller.getReservation));

router.put('/edit',validate(JoiValidation.createorupdateReservationValidator),isAuth,trycatch(reservationcontroller.updateReservation));

router.delete('/delete',isAuth,trycatch(reservationcontroller.deleteReservation));

module.exports=router;