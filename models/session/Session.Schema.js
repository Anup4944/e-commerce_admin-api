import mongoose from "mongoose";

export const SessionSchema = mongoose.Schema({
    accessJWT: {
        type: String ,
        require: true ,
        default: "", 
    },

    userId: {
        type: mongoose.Schema.ObjectId ,
        default: null, 
    }, 
    
},

    {
        timestamp: true, 
    }

);

const SessionSchema = mongoose.model("Session", SessionSchema)
export default SessionSchema;


