const mongoose=require("mongoose");
const validator=require("validator")
const bcrypt=require("bcrypt")

const userSchema=mongoose.Schema({
    name:{
        type:String,
        minLength:[2,"Please enter a valid name"],
        maxLength:[50,"Maximum character limit exceeded"],
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate:[validator.isEmail,"Please enter a valid email"]
    },
    location:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
        minLength:[6,"Password must be 6 characters long"],
        maxLength:[32,"Maximum character limit exceeded"]
    },
    Date:{
        type:Date,
        default:Date.now
    }
})


userSchema.pre('save', async function(next){
    if(!this.isModified('password')) return next();
    this.password=await bcrypt.hash(this.password,10);
    next();
})

const User=mongoose.model('user', userSchema);
module.exports=User