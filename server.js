import express from 'express';
const app = express();
import morgan from 'morgan';


import cors from 'cors';
const PORT= process.env.PORT || 8000

app.use(cors());
app.use(morgan("tiny"));


import loginRouter from "./routers/login.router.js";

app.use(express.urlencoded({ extended: false }))
 
// parse application/json
app.use(express.json())



//  USE API'S
app.use('/api/v1/login', loginRouter); 
 
app.get('/', function (req, res) {
  console.log(req.body)
  res.send('Hello World')
})

//404 error
app.use((req,res,next) =>{   // throwing an error
  const error = new error("resources not found")
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