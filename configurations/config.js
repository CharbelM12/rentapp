const dotenv=require('dotenv').config();

module.exports={
    Port: process.env.PORT,
    Mongo_uri:process.env.MONGO_URI
}