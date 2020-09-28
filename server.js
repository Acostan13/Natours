const dotenv = require('dotenv')
const app = require('./app')

dotenv.config({ path: './config.env' })

const port = process.env.PORT || 8000

// Start server
app.listen(port, () => {
    console.log(`App running on port ${port}`)
})
