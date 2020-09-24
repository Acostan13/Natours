const express = require('express')
const fs = require('fs')

const app = express()

// Get request => Read
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Hello from the server side!',
        app: 'Natours!'
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
    res.status(200).json({
        status: 'success',
        results: tours.length, // only relevant to use when you are getting/sending an array with multiple objects
        data: {
            tours // If data has same name as property (tours), you can exclude the value
        },
    })
})

const port = 3000
app.listen(port, () => {
    console.log(`App running on port ${port}`)
})
