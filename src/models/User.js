const {mongoose}= require('mongoose')

const userSchema = mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    lastName:{
        type:String
    },
    identity:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    phone:{
        type:String
    },
    adress:{
        type:String
    },
    rol:{
        type:["user","admin","employee"],
        default:"user"
    },

})


module.exports = mongoose.model('User',userSchema)