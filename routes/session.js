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
    (req, res) => {        
        return res.send(req.context.models.users[req.context.me.id]);
    }
);

// Export Module (export the router NOT as an object inside { })
export default router;
