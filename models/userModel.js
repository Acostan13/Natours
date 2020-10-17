const mongoose = require('mongoose')
const validator = require('validator')

const userSchema = new mongoose.Schema ({
    name: {
        type: String,
        required: [true, 'Please input your name'],
        unique: [true, 'That name is already taken!'],
    },
    email: {
        type: String,
        required: [true, 'Please provide your email address'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email']
    },
    photo: {
        type: String
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: [
            8,
            'A password must have more than or equal to 8 characters'
        ]
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Please confirm your password'],
        minlength: [
            8,
            'A password must have more than or equal to 10 characters'
        ]
    }   
})

const User = mongoose.model('User', userSchema)

module.exports = User