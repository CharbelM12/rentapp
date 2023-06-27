const express=require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser')
const config=require('./configurations/config');
const errorhandler=require('./src/middleware/Errorhandler');
const globalRoutes=require('./Global-routes');
const deletereservations=require('./src/middleware/deletereservations')

const app=express();
app.use(bodyParser.json());



app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});


app.use(globalRoutes);
app.use(errorhandler);  


async function connect (){
try {
  await mongoose.connect(config.Mongo_uri);
  console.log("Mongodb connected");
} catch(error){
  throw error;
}
}
 
app.listen(config.Port,()=>{
    connect()
    deletereservations;
    console.log('listening from port '+config.Port);
    let date=new Date();
    console.log(date)
});






   
    
 

