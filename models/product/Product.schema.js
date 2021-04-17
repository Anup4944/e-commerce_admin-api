import mongoose from "mongoose";

export const ProductSchema = mongoose.Schema({
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

    price: {
        type: Number ,
        require: true ,
        default: 0, 
    },

    salePrice: {
        type: Number ,
        
    },

    saleEndDate: {
        type: String ,
    },

    quantaty: {
        type: Number ,
        require: true ,
        default: 0,
    },

    description: {
        type: String ,
        require: true ,
        default: "",
    },

    thumbNail: {
        type: String
    },

    images: {
        type: Array
    },

    category: {
        type: Array
    },


    
},

    {
        timestamp: true, 
    }

);

const ProdSchema = mongoose.model("Product", ProductSchema)
export default ProdSchema;


