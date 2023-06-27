const mongoose=require('mongoose');

const Schema=mongoose.Schema;
const BrandSchema=new Schema({
    name:String,
    Country:String,
    foundedyear:Number   
})

BrandSchema.index({country:1});

module.exports=mongoose.model('Brand',BrandSchema)