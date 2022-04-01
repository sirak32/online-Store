const express = require('express');
const env = require('dotenv');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//routes
const userRoutes = require('./routes/user');

// environment variable
env.config();
//mogodb connection
const connection_uri=`mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.mqvvp.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`
const port= process.env.port || 2000
 mongoose.connect(connection_uri,{
      useNewUrlParser: true,
     useUnifiedTopology: true,
    // useCreateIndex: true,

})
.then(() =>{
    console.log('Database connected');
})

 app.use(bodyParser());
 app.use('/api', userRoutes);
 app.listen(process.env.PORT, () =>{
     console.log(`Server is running on port ${process.env.PORT}`);
 });

 