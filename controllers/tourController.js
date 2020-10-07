const Tour = require('../models/tourModels')

exports.aliasTopTours = async (req, res, next) => {
    req.query.limit = '5'
    req.query.sort = '-ratingsAverage,price'
    req.query.fields = 'name,price,ratingsAverage,summary,difficulty'
    next()
}

// // Route Handlers
exports.getAllTours = async (req, res) => {
    try {
        console.log(req.query)
        // Build the query
        // 1) Filtering
        // eslint-disable-next-line node/no-unsupported-features/es-syntax
        const queryObj = { ...req.query }
        const excludedFields = ['page', 'sort', 'limit', 'fields']
        excludedFields.forEach((el) => delete queryObj[el])

        // 2) Advanced filtering
        let queryStr = JSON.stringify(queryObj)
        queryStr = queryStr.replace(
            /\b(gte|gt|lte|lt)\b/g,
            (match) => `$${match}`
        ) // regex for <=> operators

        let query = Tour.find(JSON.parse(queryStr))

        // 2) Sorting
        if (req.query.sort) {
            const sortBy = req.query.sort.split(',').join(' ')
            query = query.sort(sortBy)
        } else {
            query = query.sort('-createdAt')
        }

        // 3) Field limiting
        if (req.query.fields) {
            const fields = req.query.fields.split(',').join(' ')
            query = query.select(fields)
        } else {
            query = query.select('-__v')
        }

        // 4) Pagination
        const page = req.query.page * 1 || 1
        const limit = req.query.limit * 1 || 100
        const skip = (page - 1) * limit

        //page=2&limit=10, page 1: 1-10, page 2: 11-20, page 3: 21-30
        query = query.skip(skip).limit(limit)

        if (req.query.page) {
            const numTours = await Tour.countDocuments()
            if (skip >= numTours) throw new Error('This page does not exist')
        }

        // Execute the query
        const tours = await query

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
