const DB_URI = 'mongodb+srv://ankitpatelak2017:3VI6fOseehHaVzsF@freecodecamplearn.ahizvvk.mongodb.net/?retryWrites=true&w=majority&appName=FreeCodeCampLearn';
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const connectToDatabase = async () => {
    try {
        await mongoose.connect(DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    } catch (err) {
        console.error('MongoDB connection error:', err);
        process.exit(1); // Exit the process with a non-zero status code
    }
};

const connection = mongoose.connection;

// Event listeners
connection.on('error', err => {
    console.error('MongoDB error:', err);
});

connection.on('connected', () => {
    console.log('MongoDB connected to server');
});

connection.on('disconnected', () => {
    console.log('MongoDB disconnected');
});

module.exports = connectToDatabase;
