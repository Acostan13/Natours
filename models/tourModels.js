const mongoose = require('mongoose')
const dotenv = require('dotenv')
const app = require('../app')

dotenv.config({path: './config.env'})

const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
)

const tourSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A tour must have name'], // validator
        unique: true,
    },
    rating: {
        type: Number,
        default: 4.5,
    },
    price: {
        type: Number,
        required: [true, 'A tour must have price'],
    },
})

// Always capitalize variables for Models or Schema objects
const Tour = mongoose.model('Tour', tourSchema)

module.exports = Tour