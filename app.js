const express = require('express');
require('dotenv').config();
const db = require('./config/db');
const cloudinary = require('./config/cloundinary');
const app = express()

db();
cloudinary();

app.use(express.json({
    extended: false
}));

app.use('/', require('./routes/redirect'));
app.use('/api/url', require('./routes/saveUrl'));
app.use('/api/upload/image', require('./routes/uploadImg'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`)
});

