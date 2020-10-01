const Tour = require('./../models/tourModels')

// const tours = JSON.parse(
//     fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
// )

// // Route Handlers
exports.checkBody = (req, res, next) => {
    if (!req.body.price || !req.body.name) {
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
        // results: tours.length, // only relevant to use when you are getting/sending an array with multiple objects
        // data: {
        //     tours, // If data has same name as property (tours), you can exclude the value
        // },
    })
}

exports.getTour = (req, res) => {
    console.log(req.params) // req.params => object that assigns value to a variable: id

    const id = req.params.id * 1 // converts string that contains numbers into a number
    // const tour = tours.find((el) => el.id === id) // find() => returns array where the logic below is true

    // res.status(200).json({
    //     status: 'success',
    //     data: {
    //         tour,
    //     },
    // })
}

exports.createTour = (req, res) => {
    res.status(201).json({
        // status 201: Created
        status: 'success',
        // data: {
        //     tour: newTour,
        // },
    })
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
