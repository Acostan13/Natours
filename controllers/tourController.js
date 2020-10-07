const Tour = require('../models/tourModels')
const APIFeatures = require('../utils/apiFeatures')

exports.aliasTopTours = async (req, res, next) => {
    req.query.limit = '5'
    req.query.sort = '-ratingsAverage,price'
    req.query.fields = 'name,price,ratingsAverage,summary,difficulty'
    next()
}

// // Route Handlers
exports.getAllTours = async (req, res) => {
    try {
        // Execute the query
        const features = new APIFeatures(Tour.find(), req.query)
            .filter()
            .sort()
            .limitFields()
            .paginate()
        const tours = await features.query

        // Send the response
        res.status(200).json({
            // status 200: OK
            status: 'success',
            results: tours.length, // only relevant to use when you are getting/sending an array with multiple objects
            data: {
                tours // If data has same name as property (tours), you can exclude the value
            }
        })
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        })
    }
}

exports.getTour = async (req, res) => {
    try {
        const tour = await Tour.findById(req.params.id)
        // Tour.findOne({ _id: req.params.id})
        res.status(200).json({
            status: 'success',
            data: {
                tour
            }
        })
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        })
    }
}

exports.createTour = async (req, res) => {
    // const newTour = new Tour({})
    // newTour.save()
    try {
        const newTour = await Tour.create(req.body)

        res.status(201).json({
            // status 201: Created
            status: 'success',
            data: {
                tour: newTour
            }
        })
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        })
    }
}

exports.updateTour = async (req, res) => {
    try {
        const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })
        res.status(200).json({
            status: 'success',
            data: {
                tour
            }
        })
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: 'Invalid data set'
        })
    }
}

exports.deleteTour = async (req, res) => {
    try {
        await Tour.findByIdAndDelete(req.params.id)
        res.status(204).json({
            // Status code 204: No content
            status: 'success',
            data: null
        })
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: 'Invalid data set'
        })
    }
}
