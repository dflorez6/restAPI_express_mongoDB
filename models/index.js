//====================
// ENV
//====================
// Fix for __dirname && __filename in ES6
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Import dotenv
import dotenv from 'dotenv';
// TODO: Since this file is one level deepr in the folder structure THIS CHANGED TO '../.env' TWO .. to make it work
dotenv.config({ path: path.resolve(__dirname, '../.env') })

//====================
// Data Models
//====================
// Import the dependencies
import mongoose from 'mongoose';
import User from './user.js'
import Message from './message.js'

// Connect to DB
const connectDB = () => {
    return mongoose.connect(process.env.DATABASE_URL);
}

// Combine models
const models = { User, Message };

// Export
export { connectDB };
export default models;