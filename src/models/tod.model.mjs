import { Schema, model } from "mongoose"

export class Tod{
    id
    message
    tod
    lang
    visible
}

export const TodSchema = new Schema(
    {
        message: {type: String, required:true},
        tod: {type: String, required:true},
        lang: {type: String, required:true},
        visible: {type:Boolean, required:true}
    },{
        toJSON:{
            virtuals: true
        },
        toObject:{
            virtuals: true
        },
        timestamps:true
    }
)

export const TodModel = model("tod", TodSchema)