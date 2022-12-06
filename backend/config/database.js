const mongoose = require("mongoose");

const connectDatabase = ()=> {
    try{
        mongoose.connect(process.env.DB_URI).then((data)=>{
            console.log(`mongodb connected with server : ${data.connection.host}`)
        }) 
    }
    catch(err){
        console.log('err: ',err);
    }       
}

module.exports = connectDatabase;

