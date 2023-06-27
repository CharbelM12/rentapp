const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const userSchema=new Schema({
     email:String,
     password:String,
     name:String, 
     rentedcars:{
          type:Number,
          default:0
     }
})
userSchema.index({rentedcars:1});

module.exports= mongoose.model('User',userSchema);