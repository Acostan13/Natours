const fs = require('fs')

const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
)

// Route Handlers
exports.checkID = (req, res, next, val) => {
    console.log(`Tour id is : ${val}`)
    if (req.params.id * 1 > tours.length) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID',
        })
    }
    next()
}

// Create a checkBody middleware
// Check if body contains the name and price property
// If not, send back 400 (bad request)
// Add it to the post handler stack
exports.checkBody = (req, res, next) => {
    if (!req.params.price || !req.params.name) {
        return res.status(400).json({
            status: 'fail',
            message: 'Invalid name or price',
        })
    }
    next()
}

exports.getAllTours = (req, res) => {
    console.log(req.requestTime) // Displays time when the request was made
    res.status(200).json({
        // status 200: OK
        status: 'success',
        requestedAt: req.requestTime,
        results: tours.length, // only relevant to use when you are getting/sending an array with multiple objects
        data: {
            tours, // If data has same name as property (tours), you can exclude the value
        },
    })
}

exports.getTour = (req, res) => {
    console.log(req.params) // req.params => object that assigns value to a variable: id

    const id = req.params.id * 1 // converts string that contains numbers into a number
    const tour = tours.find((el) => el.id === id) // find() => returns array where the logic below is true

    res.status(200).json({
        status: 'success',
        data: {
            tour,
        },
    })
}

exports.createTour = (req, res) => {
    const newId = tours[tours.length - 1].id + 1
    const newTour = Object.assign({ id: newId }, req.body)

    tours.push(newTour)

    fs.writeFile(
        `${__dirname}/dev-data/data/tours-simple.json`,
        JSON.stringify(tours),
        (err) => {
            res.status(201).json({
                // status 201: Created
                status: 'success',
                data: {
                    tour: newTour,
                },
            })
        }
    )
    // res.send('Done') // Data must always be sent in order to finish the req/res cycle
}

exports.updateTour = (req, res) => {
    res.status(200).json({
        status: 'success',
        data: {
            tour: '<Updated tour here...>',
        },
    })
}

exports.deleteTour = (req, res) => {
    res.status(204).json({
        // Status code 204: No content
        status: 'success',
        data: null,
    })
}
