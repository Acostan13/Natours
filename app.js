const express = require('express')
const fs = require('fs')

const app = express()

// middleware => function that can modify the incoming request data
// stand between the request and the response
app.use(express.json())

// Get request => Read
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Hello from the server side!',
        app: 'Natours!',
    })
})

// Post request: Client sends new resource to the server => Create
app.post('/', (req, res) => {
    res.send('Posting to this endpoint...')
})

// Put request: Client sends entire updated object to the server=> Update
// Patch request: Client sends only part of the updated object that has been changed to the server => Update
// Delete request: Client removes resource from the server => Delete

const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
)

app.get('/api/v1/tours', (req, res) => {
    // status 200: OK
    res.status(200).json({
        status: 'success',
        results: tours.length, // only relevant to use when you are getting/sending an array with multiple objects
        data: {
            tours, // If data has same name as property (tours), you can exclude the value
        },
    })
})

// Accounts for specific tours
app.get('/api/v1/tours/:id', (req, res) => {
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
})

app.post('/api/v1/tours', (req, res) => {
    // console.log(req.body)
    const newId = tours[tours.length - 1].id + 1
    const newTour = Object.assign({ id: newId }, req.body)

    tours.push(newTour)
    // status 201: Created
    fs.writeFile(
        `${__dirname}/dev-data/data/tours-simple.json`,
        JSON.stringify(tours),
        (err) => {
            res.status(201).json({
                status: 'success',
                data: {
                    tour: newTour,
                },
            })
        }
    )

    // res.send('Done') // Data must always be sent in order to finish the req/res cycle
})

// Updating tour data
app.patch('/api/v1/tours/:id', (req, res) => {
    if (req.params.id * 1 > tours.length) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID',
        })
    }

    res.status(200).json({
        status: 'success',
        data: {
            tour: '<Updated tour here...>'
        }
    })
})

const port = 3000
app.listen(port, () => {
    console.log(`App running on port ${port}`)
})
