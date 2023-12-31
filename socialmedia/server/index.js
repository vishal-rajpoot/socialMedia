import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import dotenv from 'dotenv';
// import { Logger } from 'logger';
import authRoute from './Routes/authRoute.js';
import userRoute from './Routes/userRoute.js';

// routes

const app = express();

// middlewares
app.use(bodyParser.json({limit: '30mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '30mb', extended: true}));

dotenv.config();
const db = mongoose.connect(process.env.MONGO_DB)

const connection = async db => {
    app.listen( process.env.PORT, () => {
        console.log(`server started listening at port ${process.env.PORT}`);        
    })
}
connection();

app.use('/auth', authRoute);
app.use('/user', userRoute); 
