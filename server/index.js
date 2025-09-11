// const express = require("express") //load or import the express
// const cookieParser = require('cookie-parser');
// const app = express()
// require('dotenv').config()
// app.use(express.json())//middleware
// const cors =require('cors');
// app.use(cors({
//     origin: "http://localhost:5173",   // Your React dev server origin
//     credentials: true                  // MUST be true to allow cookies
// }));
// const adminRouter = require('./router/adminRoute');
// const userRouter = require('./router/userRoutes');
// const paymentRouter = require('./router/paymentRoutes');
// const {ConnectDB}= require('./utils/dbConnector');
//  ConnectDB();
// app.use(cookieParser()); 
// app.use('/payment',paymentRouter);
// app.use('/api/admin',adminRouter);
// app.use('/api/user',userRouter);
// app.listen(process.env.PORT,()=>{
//     console.log("App is running ");
   
// })



const express = require("express");
const cookieParser = require('cookie-parser');
const app = express();
require('dotenv').config();
const cors = require('cors');
const adminRouter = require('./router/adminRoute');
const userRouter = require('./router/userRoutes');
const paymentRouter = require('./router/paymentRoutes');
const { ConnectDB } = require('./utils/dbConnector');

// Connect to Database
ConnectDB();

// MIDDLEWARE
app.use(cors({
    origin: "http://localhost:5173",   // Your React dev server origin
    credentials: true                  // MUST be true to allow cookies
}));
app.use(express.json()); // To parse JSON bodies
app.use(cookieParser()); // To parse cookies from request headers

// ROUTES
app.use('/payment', paymentRouter);
app.use('/api/admin', adminRouter);
app.use('/api/user', userRouter);

app.listen(process.env.PORT, () => {
    console.log(`App is running on port ${process.env.PORT}`);
});