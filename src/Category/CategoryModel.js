const mongoose=require('mongoose');

const Schema=mongoose.Schema;
const CategorySchema=new Schema({
    name:String,
    description:String,
    seatingcapacity:Number,
    Brand:{
        type:Schema.Types.ObjectId,
        ref:"Brand"
    }
})

CategorySchema.index({Brand:1});

module.exports=mongoose.model('Category',CategorySchema)