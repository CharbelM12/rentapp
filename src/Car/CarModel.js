const mongoose=require('mongoose');

const Schema=mongoose.Schema;
const CarSchema=new Schema({
    name:String,   
    model:String,
    Brand:{
        type:Schema.Types.ObjectId,
        ref:"Brand"
    },
    Category:{
        type:Schema.Types.ObjectId,
        ref:"Category"
    }
})

CarSchema.index({Brand:1});
CarSchema.index({Category:1});

module.exports=mongoose.model('Car',CarSchema)