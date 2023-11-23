import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors'; // Import the cors package

// import routes
import game_routes from './routes/game_routes.js';

// connect to MongoDB
mongoose.connect(process.env.MONGODB_URI);
const db = mongoose.connection;

db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
});

db.on("error", () => {
    console.log("Error connecting to MongoDB using Mongoose!");
});

// set up express
const PORT = process.env.PORT || 8000;
const app = express();

// Enable CORS for all routes (this is needed for the frontend and backend to communicate via API calls)
app.use(cors()); // Use CORS middleware

app.use(express.json());

app.use('/games', game_routes)

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});
