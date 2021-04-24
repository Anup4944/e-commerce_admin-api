import express from 'express' ; 
const router = express.Router()
import slugify from "slugify";
import multer from "multer";

import { getProduct, insertProduct,updateProductById , getProductById } from '../models/product/Product.model.js'
import { newProductValidation,updateProductValidation } from "../middlewares/formValidation.js";

// multer configuration
const ALLOW_FILE_TYPE ={
    "image/png": "png",
    "image/jpeg": "jpeg",
    "image/jpg": "jpg"
}

//  end multer configuration

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let error = null 

        /// get file type req.mimetype
    const isAllowed = ALLOW_FILE_TYPE[file.mimetype]
    if(!isAllowed){
        error = new error("Some of the files are not allowed, only images are allowed")
        error.status = 400 ; 
    }


    cb(error, 'public/img/product')
    },
   
    filename: function (req, file, cb) {
        const fileName = slugify(file.originalname.split(".")[0]);
        const extension = ALLOW_FILE_TYPE[file.mimetype]
        const fullFileName = fileName + '-' + Date.now() + '.' + extension;
      cb(null, fullFileName)
    }
  })
  
var upload = multer({ storage: storage })

router.all('/' , (req,res,next) =>{
    next()

});

router.get('/:_id?', async (req, res) =>{
    const{ _id} = req.params
    try {
        const result = _id ? await getProductById(_id) : await getProduct();
        res.json({
            status: 'success',
            message : "The product has been added",
            result, 
        })
        }
         catch (error) {
         throw error;    
    }
})

router.post("/", newProductValidation, async (req,res,next) => {



    try {

        const addNewProd = {
            ...req.body,
            slug: slugify(req.body.name)
        }

        
        const basePath = `${req.protocol}://{req.get('host')}/img/product`;

        const files= req.files;
        console.log(files);

        const images = [];
        files.map(file => {
            const imgFullPath  = basePath + file.filename
            images.push(imgFullPath);
        })


       const result = await insertProduct({...addNewProd,images});
        console.log(result);

        if(result._id){
            return res.json({
                status:"success",
                message: "The product has been added",
                result, 

            })
        }

        res.json({
            status: "error", 
            message: "Unable to add the product, Please try again ",
        })

        
    } catch (error) {
        throw error;
    }
    
} )

router.put('/',upload.array('images', 5),updateProductValidation, async (req, res) =>{
    try {
   const {_id,imgToDelete,...frmDt} = req.body;

    const basePath = `${req.protocol}://{req.get('host')}/img/product`;
    const files= req.files;
    const images = [];
    files.map(file => {
        const imgFullPath  = basePath + file.filename
        images.push(imgFullPath);
    })
    //get images from db and filter them
    // old images and remove images
    if(imgToDelete.length){
            const deleteImgSource = imgToDelete.split(",")
            // get product from db
            const prod = await getProductById(_id)
            if(prod.images.length){
                // imgtodelete is coming from front end to remove db
                // prod.images is coming from db, the old image.
                // now, we need to filter prod.images basedon imgToDelete

                const updatingImages = prod.images.filter(imgSource => !deleteImgSource.includes(imgSource));
                images = [...images, ...updatingImages];
            }   
        }
         const updateProduct = {
            ...FormDt,
            images,
        };
        const result = await updateProductById({_id, updateProduct})
        console.log(result)

        if(resilt?._id){
            return res.json({
                status:"success",
                message: "The product has been updated",
                result
            });
    }
        res.json({
            status: "error",
            message: "Unable to update the product, Please try again later",
            result,
        });    
    }catch  {
        
    throw error;
    }
    
})



export default router;
