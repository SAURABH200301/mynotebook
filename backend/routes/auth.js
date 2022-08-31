const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');

//Create a User Using :POST "/api/auth/createuser" .Doesnt't require authentication
router.post('/createuser',
    [
        body('name','Enter the valid name').isLength({min:3}),
        body('email','Enter the valid mail id').isEmail(),
        body('password','Password must be atleast 5 characters').isLength({min:5})
    ]
    ,async (req, res) => {
        //if there are errors,return bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        //check whether the user with same email exist
        try{
    
            let user = User.findOne({email: req.body.email});
            
            if(user){
                return res.status(400).json({error: "Sorry a user with this email already exist"});
            }
            user= await User.create({
                name: req.body.name,
                password: req.body.password,
                email: req.body.email,
            })
            // console.log(user)
            res.json(user);
        }catch(err){
            console.log(err)
        }
});

module.exports = router;