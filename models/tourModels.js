const mongoose = require('mongoose')
const slugify = require('slugify')

const tourSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'A tour must have name'], // validator
            unique: true,
            true: true
        },
        slug: String,
        duration: {
            type: Number,
            required: [true, 'A tour must have duration']
        },
        maxGroupSize: {
            type: Number,
            required: [true, 'A tour must have a maximum group size']
        },
        difficulty: {
            type: String,
            required: [true, 'A tour must have a difficulty']
        },
        ratingsAverage: {
            type: Number,
            default: 4.5
        },
        ratingsQuantity: {
            type: Number,
            default: 0
        },
        price: {
            type: Number,
            required: [true, 'A tour must have price']
        },
        priceDiscount: Number,
        summary: {
            type: String,
            trim: true,
            required: [true, 'A tour must have a summary']
        },
        description: {
            type: String,
            trim: true
        },
        imageCover: {
            type: String,
            required: [true, 'A tour must have an image cover']
        },
        images: [String],
        createdAt: {
            type: Date,
            default: Date.now(),
            select: false
        },
        startDates: [Date]
    },
    {
        toJSON: { virtuals: true }
    }
)

tourSchema.virtual('durationWeeks').get(function () {
    return this.duration / 7
})

// Document Middleware: runs before .save() and .create()
tourSchema.pre('save', function (next) {
    this.slug = slugify(this.name, { lower: true })
    next()
})

// tourSchema.pre('save', function (next) {
//     console.log('Will save document')
//     next()
// })

// tourSchema.post('save', function (doc, next) {
//     console.log(doc)
//     next()
// })

// Always capitalize variables for Models or Schema objects
const Tour = mongoose.model('Tour', tourSchema)

module.exports = Tour
