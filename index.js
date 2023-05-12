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

// Decode post information from the URL
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// User CORS on all routes
app.use(cors());

//====================
// Models
//====================
import models from './models/index.js';

// .use() - This method is part of Express Middleware, defines a layer that sits on top of all the other RESTful types
app.use(
    (req, res, next) => {
        const authUserId = 1;
        // TODO: Using req.context allows to pass the values to all the routes and then I can move the routes to other folders without breaking anything
        // You don't need necessarily the context object as a container, but I found it a good practice to keep 
        // everything that is passed to the routes at one place
        req.context = {
            models,
            me: models.users[authUserId]
        }
        // To use req.context: 
        // e.g. to get all users -> req.context.models.users
        // e.g. to get authenticated user -> req.context.models.users[req.context.me.id]

        //--------------------
        // Pseudo Authenticated User
        //--------------------
        req.me = models.users[authUserId];        
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
app.listen(process.env.PORT, () =>
    console.log(`Example app listening on port ${process.env.PORT}!`),
);