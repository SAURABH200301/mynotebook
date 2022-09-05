const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs'); //bringing variable of bcryptJS 
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'Saurabhknowswh0kno0ws';
//Create a User Using :POST "/api/auth/createuser" .Doesnt't require authentication
router.post('/createuser',
    [
        body('name', 'Enter the valid name').isLength({ min: 3 }),
        body('email', 'Enter the valid mail id').isEmail(),
        body('password', 'Password must be atleast 5 characters').isLength({ min: 5 })
    ]
    , async (req, res) => {
        //if there are errors,return bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        //check whether the user with same email exist
        try {

            let user = await User.findOne({ email: req.body.email });

            if (user) {
                return res.status(400).json({ error: "Sorry a user with this email already exist" });
            }
            const salt = await bcrypt.genSalt(10);
            let secPass = await bcrypt.hash(req.body.password, salt);
            user = await User.create({
                name: req.body.name,
                password: secPass,
                email: req.body.email,
            })

            const data = {
                user: {
                    id: user.id
                }
            }
            const authToken = jwt.sign(data, JWT_SECRET);
            
            res.json({authToken})
            // res.json(user);
        } catch (err) {
            console.log(err)
            res.status(500).json("Some Error Occured");
        }
    });

module.exports = router;