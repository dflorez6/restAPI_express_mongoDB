//====================
// Message Routes
//====================
// Import the dependencies
import { v4 as uuidv4 } from 'uuid'; // Unique IDs Library
import { Router } from 'express';
const router = Router();

//--------------------
// GET
//--------------------
// Index
router.get('/',
    // Return Function
    (req, res) => {
        return res.send(Object.values(req.context.models.messages));
    }
);

// Show
router.get('/:messageId',
    // Return Function
    (req, res) => {
        return res.send(req.context.models.messages[req.params.messageId]); // Returns a specific user depending on the userId from the URI
    }
);

//--------------------
// 'POST'
//--------------------
// Create
router.post('/',
    // Return Function
    (req, res) => {
        // Create unique identifier
        const id = uuidv4();
        // Use id as a property in a message object with a shorthand object property initialization
        const message = {
            id,
            // Extract payload from incoming request
            text: req.body.text,
            userId: req.context.me.id,
        }
        
        // Assign the message by identifier to the specific Message Object
        req.context.models.messages[id] = message;

        // Return new message after it has been created
        return res.send(message);
    }
);

//--------------------
// 'PUT'
//--------------------
// Update
router.put('/:messageId',
    // Return Function
    (req, res) => {
        const messageId = req.params.messageId;
        
        // Updates Message Object values
        messages[messageId] = {
            id: req.context.models.messages[messageId].id,
            // Extract payload from incoming request
            text: req.body.text,
            userId: req.context.models.messages[messageId].userId
        }

        return res.send(`PUT HTTP method on messages/${req.params.messageId} resource`);
    }
);

//--------------------
// 'DELETE'
//--------------------
// Destroy
router.delete('/:messageId',
    (req, res) => {
        // Here we used a dynamic object property to exclude the message we want to delete from the rest of the messages object
        const { [req.params.messageId]: message, ...otherMessages } = req.context.models.messages;

        // Reassigns values inside messages Object with otherMessages (all the messages except the one just deleted)
        req.context.models.messages = otherMessages;

        return res.send(message);
        // return res.send(`DELETE HTTP method on messages/${req.params.messageId} resource`);
    }
);

// Export Module (export the router NOT as an object inside { })
export default router;