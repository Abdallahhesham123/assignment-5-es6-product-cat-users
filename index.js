import express from 'express';
import InitApp from './src/app.router.js';

const app = express();

const port =5000;

InitApp(app, express);

app.listen(port,()=>{

    console.log(`Server is running on port : ${port}`);
   
})