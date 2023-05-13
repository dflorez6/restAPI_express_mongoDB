//====================
// Session Routes (for authenticated User)
//====================
// Import the dependencies
import { Router } from 'express';
const router = Router();

//--------------------
// GET
//--------------------
// Returns Authenticated User Object
router.get('/',
    // Return Function
    // The route function becomes an asynchronous function, because we are dealing with an asynchronous 
    // request to the PostgreSQL database now
    async (req, res) => {
        // Since we passed the models conveniently via the context object to every Express route with an 
        // application-wide Express middleware before, we can make use of it here
        // The authenticated user can be used to retrieve the current session user from the database
        const user = await req.context.models.User.findById(
            req.context.me.id
        );

        return res.send(user);
    }
);

// Export
export default router;
