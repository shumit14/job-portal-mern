const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// REGISTRATION

exports.register = async (req,res)=>{
    const {name, email, password, role} = req.body

    try {
        const userExist = await User.findOne({email})
        if(userExist){
            return res.status(400).json({message : "User already Exists"})
        }

        const hashedPassword = await bcrypt.hash(password,10)                   // secured password
        
        const user = await User.create({
            name,
            email,
            password : hashedPassword,
            role: role === "ADMIN" ? "ADMIN" : "USER", 
        })

        res.status(201).json({message : " User registerd Successfully"})

    } catch (error) {

        res.status(500).json({message : " Server error"})
        
    }
}


// LOGIN

exports.login = async (req,res)=>{
    const {email,password} = req.body

    try {
        const user = await User.findOne({email})
        if(!user){
            res.status(400).json({message : "invalid Credentials"})
        }

        const isMatch = await bcrypt.compare(password,user.password)

        if(!isMatch){
            res.status(400).json({message : "invalid Credentials"})
        }


        // this is how we make potected authorization

        const token = jwt.sign(
            {id : user._id , role : user.role},
            process.env.JWT_SECRET ,
            {expiresIn : '1d'}
        );

        res.json({
            token,
            user : {
                id : user._id,
                name : user.name,
                email : user.email,
                role : user.role
            }
        })
        
    } catch (error) {
        res.status(500).json({message : "Server Error"})
        
    }
}