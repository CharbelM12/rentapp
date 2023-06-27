const express=require('express');
const router=express.Router();
const UserRoutes=require('./src/User/UserRoutes');
const CarRoutes=require('./src/Car/CarRoutes');
const BrandRoutes=require('./src/Brand/BrandRoutes');
const CategoryRoutes=require('./src/Category/CategoryRoutes');
const ReservationRoutes=require('./src/Reservation/ReservationRoutes');

router.use('/user',UserRoutes);
router.use('/car',CarRoutes);
router.use('/brand',BrandRoutes);
router.use('/category',CategoryRoutes);
router.use('/reservation',ReservationRoutes);

module.exports=router;
