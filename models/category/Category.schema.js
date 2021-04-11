import mongoose from "mongoose";

export const CategorySchema = mongoose.Schema({
    name: {
        type: String ,
        require: true ,
        default: "", 

    },

    parentCat: {
        type: String ,
        require: true ,
        default: "", 

    },
    // childCats: [  
    //     {
    //         name: {
    //             type: String ,
    //             require: true ,
    //             default: "", 
        
    //         },

    //     }
    // ]
},

    {
        timestamp: true, 
    }

);

const catSchema = mongoose.model("Categpory", CategorySchema)
export default catSchema;


