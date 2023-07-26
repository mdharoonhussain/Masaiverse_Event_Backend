const express = require("express");
const { signup, login, logout } = require("../controllers/user.controller");
const { auth } = require("../middlewares/auth");


const userRouter = express.Router();

//signup route
userRouter.post("/signup",signup);


//login route
userRouter.post("/login",login);


//logout route
userRouter.post("/logout",auth,logout)




module.exports={
    userRouter
}