const express = require("express");
const {connection} = require("./connections/db")
const cors = require("cors")
require("dotenv").config();
const {userRouter} = require("./routes/user.routes")
const {employeeRouter} = require("./routes/employee.routes")
const {auth} = require("./middlewares/auth")


const app = express()
//middlewares
app.use(cors());
app.use(express.json());


//routes

app.get("/",(req,res) => {
    res.send("Welcome to HomePage")
})


app.use("/user",userRouter);
app.use("/employees",auth, employeeRouter);

app.listen(process.env.PORT, async() => {
    try{
        await connection;
        console.log(`DB is connected`);
    } catch(err) {
        console.log({msg: "DB is not connected"})
    }
    console.log(`DB is connected at PORT ${process.env.PORT}`);
})