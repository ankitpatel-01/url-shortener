// Require the cloudinary library
const cloudinary = require('cloudinary').v2;

console.log(process.env.CLOUD_NAME, process.env.API_KEY, process.env.API_SECRET)
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});
// Log the configuration
module.exports = cloudinary.config;