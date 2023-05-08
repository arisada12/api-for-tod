import dotenv from "dotenv"
dotenv.config()
process.env.MONGO_URI

import express from "express";
import cors from "cors"
import { sample_commands } from "./datas.mjs";
import todRouter from "./routers/tod.router.mjs"
import { dbConnect } from "./configs/database.config.mjs";
dbConnect()

const app = express()
app.use(express.json())

app.use(function (req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        next();
});

app.use(cors({
    credentials: true,
}))

app.use("/api/tods", todRouter)

const port = process.env.PORT || 5000
app.listen(port, ()=>{
    console.log("Listening server from http://localhost:" + port)
})