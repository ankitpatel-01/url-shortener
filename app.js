const express = require('express');
require('dotenv').config();
const db = require('./config/db');
const cloudinary = require('./config/cloundinary');
const app = express()

db();
cloudinary();

// Allow all origins to access your API (not recommended for production)
app.use(cors());

// Or specify specific origins that are allowed to access your API
// Replace 'http://example.com' with the origin(s) you want to allow
// Allow only requests from 'http://example.com' and 'http://localhost:8080'
// app.use(cors({ 
//     origin: ['http://example.com', 'http://localhost:8080'] 
//   }));



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

