const express = require('express')
const router = express.Router()
const User= require('../models/Users')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchUser = require('../middleware/fetchUser');


// ROUTE 1: creating a user using: POST "/api/auth/createuser". Login is not required here
router.post('/createuser' , 
    body('name', "Enter a valid name").isLength({min: 2}),
    body('email', "Enter a valid email address").isEmail(), 
    body('password', "Password must be atleast 3 characters long").isLength({ min: 3 }), 
    async (req,res)=>{
        // (ALL THE LINES COMMMENTED BELOW WERE USED BEFORE USING EXPRESS VALIDATOR) 
        // console.log(req.body);     
        // const user = User(req.body)
        // user.save();
        // res.send(req.body)


        let success=false;  // will be used for redirecting the user to the home route if success=true (used in Login.jsx)

        // If there are errors then return bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({success:success, errors: errors.array() });
        }

        try{
            // check whether the user with this email exists already
            let user = await User.findOne({email: req.body.email});

            if(user)
               return res.status(400).json({success:success,error: "Sorry a user with this email already exsits"})
               
            var salt = await bcrypt.genSalt(10);
            var securePassword = await bcrypt.hash(req.body.password , salt); 
            // Creating a user
            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                // password: req.body.password,
                password: securePassword,
            })

            // JWT Token generation 
            const userData ={
                user:{
                    id:user.id
                }
            }

            const authToken = jwt.sign(userData , process.env.JWT_SECRET);
            
            // res.json(user)
            success=true;
            res.json({success:success,authToken:authToken})

        } catch(error) {
            console.error(error.message)
            res.status(500).send("Something went wrong")
        }   
})






//  ROUTE 2: Authenticating a user using: POST "/api/auth/login". Login is not required here
router.post('/login' , 
    body('email', "Enter a valid email address").isEmail(), 
    body('password', "Password field must not be empty").exists(), 
    async (req,res)=>{

        let success=false;  // will be used for redirecting the user to the home route if success=true (used in Login.jsx)

        // If there are errors then return bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {email,password} = req.body;  // { } ✅   [ ] ❌
    
        try{

            let user = await User.findOne({email});

            if(!user){
                return res.status(400).json({error:"Please login with correct credentials"});
            } else {
                const compare = await bcrypt.compare(password, user.password);
                
                if(!compare){
                    res.status(400).json({success, error:"Please login with correct credentials"});
                } else {
                    // JWT Token generation 
                    const data ={
                        user:{
                            id:user.id
                        }
                    }
                    const authToken = jwt.sign(data , process.env.JWT_SECRET);
                    success=true;
                    res.json({success, authToken:authToken})
                }
            }
            
        } catch(error) {
            console.error(error.message)
            res.status(500).send("Something went wrong")
        }

    })

//  ROUTE 3: Get the logged in user details: POST "/api/auth/getuser". Login is required here i.e. jwt token is sent here

// We use middleware function (fetchUser) here to make the application more scalable. 

// We write all the logic for extracting the data of user in a separate file as a function i.e. as a middleware function and pass it in the POST method wherever required.  

// Due to fetchUser the userid gets stored in the req and it can then be extracted. 

// Writing the middleware code in a separate file avoids repetation of code at several places.

router.post('/getuser' , fetchUser , async (req,res)=>{
        try {

        // The procedure is that we need to first decode the jwt and extract the id from it and then we can pass it to the findById() function to extract all the data of the user except their password.
            const userid = req.user.id;
            // console.log(req.user.id);
            const user = await User.findById(userid).select("-password")
            res.send(user)  
        } catch (error) {
            console.error(error.message)
            res.status(500).send("Something went wrong")
        }
    })

module.exports = router;
