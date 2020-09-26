const express = require('express')
const fs = require('fs')
const morgan = require('morgan')

const app = express()

// Middlewares
// middleware => function that can modify the incoming request data
// stands between the request and the response
app.use(express.json())
app.use(morgan('dev'))

app.use((req, res, next) => {
    console.log('Hello from the middleware')
    next() // calls next middleware in the stack
})

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString()
    next()
})

const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
)

// Route Handlers
const getAllTours = (req, res) => {
    console.log(req.requestTime)  // Displays time when the request was made
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

const getTour = (req, res) => {
    console.log(req.params) // req.params => object that assigns value to a variable: id

    const id = req.params.id * 1 // converts string that contains numbers into a number
    const tour = tours.find((el) => el.id === id) // find() => returns array where the logic below is true

    // if (id > tours.length) {
    if (!tour) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID',
        })
    }

    res.status(200).json({
        status: 'success',
        data: {
            tour,
        },
    })
}

const createTour = (req, res) => {
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

const updateTour = (req, res) => {
    if (req.params.id * 1 > tours.length) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID',
        })
    }

    res.status(200).json({
        status: 'success',
        data: {
            tour: '<Updated tour here...>',
        },
    })
}

const deleteTour = (req, res) => {
    if (req.params.id * 1 > tours.length) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID',
        })
    }

    res.status(204).json({
        // Status code 204: No content
        status: 'success',
        data: null,
    })
}

/*
app.get('/api/v1/tours', getAllTours) // Get request => Read
app.get('/api/v1/tours/:id', getTour)
app.post('/api/v1/tours', createTour) // Post request => Client sends new resource to the server => Create
app.patch('/api/v1/tours/:id', updateTour) // Patch request => Client sends only part of the updated object that has been changed to the server => Update
app.delete('/api/v1/tours/:id', deleteTour) // Delete request: Client removes resource from the server => Delete
Put request =>  Client sends entire updated object to the server=> Update
*/

// Routes
app.route('/api/v1/tours').get(getAllTours).post(createTour)
app.route('/api/v1/tours/:id').get(getTour).patch(updateTour).delete(deleteTour)

// Start server
const port = 3000
app.listen(port, () => {
    console.log(`App running on port ${port}`)
})
