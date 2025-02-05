const mongoose = require('mongoose');

// Define the connectDB function
const connectDB = async () => {
    try {
        // Replace this connection string with your actual connection string
        const conn = await mongoose.connect('mongodb+srv://CareerNexus:Samuel7340@cluster0.ne5vz.mongodb.net/CareerNexusDB?retryWrites=true&w=majority&appName=Cluster0', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1); // Exit with failure
    }
};

// Export the function so it can be used in other files
module.exports = connectDB;
