//====================
// User Routes
//====================
// Import the dependencies
import { Router } from 'express';
const router = Router();

//--------------------
// GET
//--------------------
// Index
router.get('/', 
    // Return Function
    (req, res) => {
        return res.send(Object.values(req.context.models.users)); // Returns the object values from the Models
    }
);

// Show
router.get('/:userId',
    // Return Function
    (req, res) => {
        return res.send(req.context.models.users[req.params.userId]); // Returns a specific user depending on the userId from the URI
    }
);

//--------------------
// 'POST'
//--------------------
// Create
router.post('/', 
    // Return Function
    (req, res) => {
        return res.send("POST HTTP method on user resource");
    } 
);

//--------------------
// 'PUT'
//--------------------
// Update
router.put('/:userId',
    // Return Function
    (req, res) => {
        return res.send(`PUT HTTP method on users/${req.params.userId} resource`);
    }
);

//--------------------
// 'DELETE'
//--------------------
// Destroy
router.delete('/:userId',
    // Return Function
    (req, res) => {
        return res.send(`DELETE HTTP method on users/${req.params.userId} resource`);
    }
);

// Export Module (export the router NOT as an object inside { })
export default router;