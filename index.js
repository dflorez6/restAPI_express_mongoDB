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
dotenv.config({ path: path.resolve(__dirname, './.env') })

//====================
// Import the dependencies
//====================
import cors from 'cors';
import express from 'express';

// Define my app
const app = express();

// Built-In Middleware
// Decode post information from the URL
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// User CORS on all routes
app.use(cors());

//====================
// Models
//====================
import models, { connectDB } from './models/index.js';

// Custom Middleware
// .use() - This method is part of Express Middleware, defines a layer that sits on top of all the other RESTful types
app.use(
    async (req, res, next) => {
        const authUsername = 'dflorez6';
        // TODO: Using req.context allows to pass the values to all the routes and then I can move the routes to other folders without breaking anything
        // You don't need necessarily the context object as a container, but I found it a good practice to keep 
        // everything that is passed to the routes at one place
        req.context = {
            models,
            me: await models.User.findByLogin(authUsername)
        }
        // To use req.context: 
        // e.g. to get all users -> req.context.models.users
        // e.g. to get authenticated user -> req.context.models.users[req.context.me.id] 
        next();
    }
);

//====================
// Routes
//====================
// Modularization of Routes
import routes from './routes/index.js';
app.use('/session', routes.session)
app.use('/users', routes.user)
app.use('/messages', routes.message)

//====================
// Port
//====================
// If you don't want to re-initialize your database on every Express server start:
/*
// Connect to MongoDB
connectDB().then(async () => {
    // Start Express App
    app.listen(process.env.PORT, () =>
        console.log(`Example app listening on port ${process.env.PORT}!`),
    );
});
*/

// If you want to re-initialize your database on every Express server start
const eraseDatabaseOnSync = true;

// Connect to MongoDB
connectDB().then(async () => {
    // Clears DB on every server start
    if (eraseDatabaseOnSync) 
    {
        await Promise.all([
            models.User.deleteMany({}),
            models.Message.deleteMany({})
        ]);
    }

    // Call DB Seeds
    createUsersWithMessages();

    // Start Express App
    app.listen(process.env.PORT, () =>
        console.log(`Example app listening on port ${process.env.PORT}!`),
    );
});

//====================
// DB Seeds
//====================
const createUsersWithMessages = async () => {
    // User Objects
    const user1 = new models.User({
        username: 'dflorez6'
    });

    const user2 = new models.User({
        username: 'kanut'
    });

    // Message Objects
    const message1 = new models.Message({
        text: 'Published some important book!',
        user: user1.id
    });

    const message2 = new models.Message({
        text: 'Happy to bark...',
        user: user2.id
    });

    const message3 = new models.Message({
        text: 'And chase sheep!',
        user: user2.id
    });

    // Insert data into DB
    await user1.save();
    await user2.save();

    await message1.save();
    await message2.save();
    await message3.save();
};