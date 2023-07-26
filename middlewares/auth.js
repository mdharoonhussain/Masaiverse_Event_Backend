const jwt = require('jsonwebtoken');
const { BlacklistModel } = require('../models/blacklist.model');
const { UserModel } = require('../models/user.model');
require("dotenv").config();


const auth = async(req,res,next)=>{
   try {
    const token = req.headers.authorization.split(" ")[1] || req.headers.authorization;
    const isTokenBlacklisted = await BlacklistModel.findOne({token});
    if(isTokenBlacklisted) return res.status(400).send({msg:"Session Expired Login Again!"});

    const decoded =await jwt.verify(token,process.env.JWT_SECRET);
    if(!decoded) return res.status(400).send({msg:"Session Expired Login Again!"});

    const user = await UserModel.findOne({_id:decoded.userId});
    if(!user) return res.status(400).send({msg:"Something Went Wrong!"});
    next();
   } catch (error) {
    console.log({"/middleware":error.message})
    res.status(500).send({msg:error.message})
   }
}


module.exports={
    auth
}