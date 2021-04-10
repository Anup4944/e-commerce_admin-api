import Joi from "joi";

const email = Joi.string().min(3).max(50).required()
const password = Joi.string().required()


// creating a middlewave funtion

export const loginValidation = (req,res,next) => {
const schema = Joi.object({email,password})


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
        




