const mongoose = require("mongoose");

const blacklistSchema = mongoose.Schema({
    token:{
        type:String,
        required:true,
        unique:true
    }
    
})

const BlacklistModel = mongoose.model("blacklisttoken",blacklistSchema);


module.exports={
    BlacklistModel
}