import mongoose from "mongoose";

export const CategorySchema = mongoose.Schema({
    name: {
        type: String ,
        require: true ,
        default: "", 
    },

    slug: {
        type: String ,
        require: true ,
        default: "", 
    },
    parentcat:{

    }

    
    
},

    {
        timestamp: true, 
    }

);

const CatSchema = mongoose.model("Categpory", CategorySchema)
export default CatSchema;


