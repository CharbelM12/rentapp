const mongoose=require('mongoose');

const Schema=mongoose.Schema;
const reservationSchema=new Schema({
    startdate:Date,
    enddate:Date,
    driver:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    car:{
        type:Schema.Types.ObjectId,
        ref:"Car"
    }

})

reservationSchema.index({driver:1});
reservationSchema.index({car:1});

module.exports=mongoose.model('Reservation',reservationSchema)