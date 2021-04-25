import joi from "joi"; 
const shortStr = joi.string().max(100);
const longStr = joi.string().max(2000);
const email = joi.string().min(3).max(50).required();
const password = joi.string().max(50).required();
const date = joi.date().allow(null).allow("");
const num = joi.number();
const args = joi.array();
const boolean = joi.boolean()



// creating a middlewave funtion

export const loginValidation = (req,res,next) => {
const schema = joi.object({email,password})


/// validation , getting value
const value = schema.validate(req.body) // coming from frontend

if(value.error){
  return res.json({
        status: "error",
        message: value.error.message
});
};

next();
}




export const newUserValidation = (req,res,next) => {


  const schema = joi.object({
    fname:shortStr.required(),
    lname: shortStr.required(),
    role: shortStr, 
    email,
    password, })
  
  
  /// validation , getting value
  const value = schema.validate(req.body) // coming from frontend
  
  if(value.error){
    return res.json({
          status: "error",
          message: value.error.message
  });
  };
  
  next();
  }




export const newProductValidation = (req,res,next) => {
  
  
  const categories = req.body.categories.length ? 
  req.body.categories.split(",") : [];
  
  req.body.categories = categories;
  console.log(req.body, "form")

  const schema =joi.object({
  status: boolean,
  name: shortStr.required(),
  status : boolean , 
  price: num.required(),
  salePrice : num ,
  qty: num.required() ,
  saleEndDate : date, 
  description: longStr.required() ,
  images: args,
  categories: args,
 
  
  });
  
  
  /// validation , getting value
  const value = schema.validate(req.body) // coming from frontend
  
  if(value.error){
    return res.json({
          status: "error",
          message: value.error.message
  });
  };
  
  next();
}


export const updateProductValidation = (req,res,next) => {

  req.body.saleEndDate = req.body.saleEndDate === " null " ? null : req.body.saleEndDate
  
  const schema =joi.object({
  _id: shortStr.required(),
  status:boolean.required(),
  name: shortStr.required(),
  price: num.required(),
  salePrice : num ,
  qty: num.required() ,
  saleEndDate : date, 
  description: longStr.required() ,
  images: args,
  categories: args,
  slug: shortStr.required()
  });
  
  
  /// validation , getting value
  const value = schema.validate(req.body) // coming from frontend
  
  if(value.error){
    return res.json({
          status: "error",
          message: value.error.message
  });
  };
  
  next();
}



export const addCategoryValidation = (req,res,next) => {

  req.body.saleEndDate = req.body.saleEndDate === " null " ? null : req.body.saleEndDate
  
  const schema =joi.object({
  name: shortStr.required(),
  parentCat : shortStr.required

  });
  
  
  /// validation , getting value
  const value = schema.validate(req.body) // coming from frontend
  
  if(value.error){
    return res.json({
          status: "error",
          message: value.error.message
  });
  };
  
  next();
}



// export const updateCategoryValidation = (req,res,next) => {

//   req.body.saleEndDate = req.body.saleEndDate === " null " ? null : req.body.saleEndDate
  
//   const schema =joi.object({
//   name: shortStr.required(),
//   parentCat : shortStr.required

//   });
  
  
//   /// validation , getting value
//   const value = schema.validate(req.body) // coming from frontend
  
//   if(value.error){
//     return res.json({
//           status: "error",
//           message: value.error.message
//   });
//   };
  
//   next();
// }
  



        




