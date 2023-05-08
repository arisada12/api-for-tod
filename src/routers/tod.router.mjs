import { Router } from "express"
import { sample_commands } from "../datas.mjs"
import asyncHandler from "express-async-handler"
import { TodModel } from "../models/tod.model.mjs"
const router = Router()

//All endpoint
router.get("/", asyncHandler(
    async(req, res)=>{
        const tods = await TodModel.find({visible:true})
        res.send(tods)
    }
))

//search by id
router.get("/id/:todId",asyncHandler(
    async(req,res)=>{
        const tods = await TodModel.findById(req.params.todId)
        res.send(tods)
    }
))

//generate random no matter truth or dare
router.get("/:cId/r", asyncHandler(
    async(req,res)=>{
        const cId = req.params.cId
        const tod = await TodModel.find({lang:cId, visible:true})
        const index = Math.floor(Math.random()*tod.length)
        res.send(tod[index])
    }
))

//generate random based on truth or dare
router.get("/:cId/:todTag", asyncHandler(
    async(req,res)=>{
        const cId = req.params.cId
        const todTag = req.params.todTag
        const tod = await TodModel.find({lang:cId,tod:todTag, visible:true})
        const index = Math.floor(Math.random()*tod.length)
        res.send(tod[index])
    }
))

//add new tod
router.post("/add", asyncHandler(
    async (req, res) => {
        const{message, tod, lang} = req.body
        const newUser = {
            id: "",
            message,
            tod,
            lang,
            visible: false
        }
        const dbUser = await TodModel.create(newUser)
        res.send(dbUser)
    }
))

export default router