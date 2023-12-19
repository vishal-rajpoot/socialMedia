import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
// import { Logger } from 'logger';

const port = 5000;
const app = express();
app.use(bodyParser.json({limit: '30mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '30mb', extended: true}));
const db = mongoose.connect("mongodb://localhost:27017")

const connection = async db => {
    app.listen( port, () => {
        console.log(`server started listening at ${port}`);
        // logger.info(`server started listening at ${port}`)
    })
}
connection();