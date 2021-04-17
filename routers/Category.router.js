import express from 'express' ; 
const router = express.Router()
import slugify from "slugify";

import { getCategory, insertCategory, deleteCategory } from "../models/category/Category.model.js";

router.all("*", (req,res,next) =>{
    next()
})

router.get("/", async (req,res) =>{

try {
    const result = await getCategory()
    res.json({
        status: 'success',
        message: 'Fetching success.',
        result,
    })
    
} catch (error) {
    console.log(error);
    throw new Error(error.message);
    
}
})

router.post("/", async (req, res) =>{
    console.log(">>>>", req.body)

    const {name, parentCat} = req.body


    try {
        const newCat = {
            name,
            slug: slugify(name, {lower: true}),
            parentCat
        } 

        const result = await insertCategory(newCat)
        res.json({
            status: 'success',
            message: 'Category has been added',
            result,
        })
        
    } catch (error) {
        console.log(error);
        throw new Error(error.message);
        
    }
})


router.delete("/", async (req, res) =>{
    console.log(">>>>", req.body)

    const {name, parentCat} = req.body
    const catIds = [];


    try {

        const result = await deleteCategory(catIds)
        res.json({
            status: 'success',
            message: 'Category has been delted',
            result,
        })
        
    } catch (error) {
        console.log(error);
        throw new Error(error.message);
        
    }
})


export default router;