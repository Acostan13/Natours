const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config({ path: './config.env' })
const app = require('./app')

const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
)

mongoose
    .connect(DB, {
        // options used to deal with deprecation warnings
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    })
    .then(() => console.log('DB connection established'))

const port = process.env.PORT || 3000

// Start server
const server = app.listen(port, () => {
    console.log(`App running on port ${port}`)
})

process.on('unhandledRejection', (err) => {
    console.log(err.name, err.message)
    console.log('Unhandled Rejection! Shutting down...')
    server.close(() => {
        process.exit(1)
    })
})
