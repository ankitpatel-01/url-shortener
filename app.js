const express = require('express')
const db = require('./db/connection')
const app = express()

db();

app.use(express.json({
    extended: false
}))

app.use('/', require('./routes/redirect'))
app.use('/api/url', require('./routes/saveUrl'))

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`)
})

