import dotenv from "dotenv";
dotenv.config();

import express from 'express';
const app = express();
import morgan from 'morgan';

import mongoClient from "./config/db.js";
mongoClient();


import cors from 'cors';
const PORT= process.env.PORT || 8000

app.use(cors());
app.use(morgan("tiny"));

app.use(express.urlencoded({ extended: false }))
 
// parse application/json
app.use(express.json())

// LOAD ROUTERS
import loginRouter from "./routers/login.router.js";
import userRouter from "./routers/user.router.js";
import categoryRouter from "./routers/Category.router.js";
import productRouter from "./routers/Product.router.js";
import tokenRouter from "./routers/Token.router.js";
import userAuthorization from "./middlewares/authorization.middleware.js";



//  USE API'S
app.use('/api/v1/login', loginRouter); 
app.use('/api/v1/user', userRouter); 
app.use('/api/v1/category', categoryRouter);
app.use('/api/v1/token', tokenRouter);
app.use('/api/v1/product', productRouter);
 
app.get('/', function (req, res) {
  console.log(req.body)
  res.send('Hello World')
})


//404 error
app.use((req,res,next) =>{   // throwing an error
  const error = new Error("resources not found")
  error.status = 404;
  next(error);

})

/// handle error
import { handleError } from "./utils/errorHandler.js";

app.use((error,req,res,next) =>{
  handleError(error,res);

})
 
app.listen(PORT , error =>{
  if(error) 
  console.log(error)

  console.log(`Server is running at hhtps:\\localhost:${PORT}`)
})