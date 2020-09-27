const express = require('express')
const morgan = require('morgan')

const tourRouter = require('./routes/tourRoutes')
const userRouter = require('./routes/userRoutes')

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

/*
app.get('/api/v1/tours', getAllTours) // Get request => Read
app.get('/api/v1/tours/:id', getTour)
app.post('/api/v1/tours', createTour) // Post request => Client sends new resource to the server => Create
app.patch('/api/v1/tours/:id', updateTour) // Patch request => Client sends only part of the updated object that has been changed to the server => Update
app.delete('/api/v1/tours/:id', deleteTour) // Delete request: Client removes resource from the server => Delete
Put request =>  Client sends entire updated object to the server=> Update
*/

// Mounting routes
app.use('/api/v1/tours', tourRouter)
app.use('/api/v1/users', userRouter)

module.exports = app
