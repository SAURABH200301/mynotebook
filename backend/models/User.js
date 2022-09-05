const mongoose = require('mongoose');
const { Schema } = mongoose; //Schema is defined in mongoose

const UserSchema = new Schema({ //creating new schema
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required:true,
        unique: true
    },
    password:{
        type: String,
        required:true
    },
    date:{
        type:Date,
        default: Date.now
    }

});
const User = mongoose.model('user',UserSchema); //creating model named User which defines the relation betwenn 'user' and schema
module.exports =  User; //here we exports the User