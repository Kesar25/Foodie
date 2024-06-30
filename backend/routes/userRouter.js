const User = require("../models/userSchema")
const { body, validationResult } = require("express-validator")
const express=require("express");
const router=express.Router();

router.post("/createuser", [body('name', 'Enter a valid name').isLength({ min: 2 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be at least 5 characters long').isLength({ min: 6 })],
        async (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({success:false, errors: errors.array() });
            }
    
            try {
                let user = await User.findOne({ email: req.body.email });
                if (user) {
                    let success=false
                    return res.status(400).json({success, error: "Sorry user with this email already exist" })
                }
                
                const {name, email, password, location,}=req.body;
                user=await User.create({
                    name,
                    email,
                    password,
                    location
                });

                let success=true;
                res.json({success,user})
            } catch (e) {
                console.log(e.message);
                let success=false
                res.status(500).send({success,error:"Some error occured"})
            }
    
    })

module.exports=router;