//====================
// Message Routes
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
    async (req, res) => {
        // Retrieves all Messages from DB
        const messages = await req.context.models.Message.find();
        
        // Returns all Messages
        return res.send(messages);
    }
);

// Show
router.get('/:messageId',
    // Return Function
    async (req, res) => {
        // Retrieves Message from DB by id
        const message = await req.context.models.Message.findById(
            req.params.messageId
        );

        // Returns Message by messageId passed as param on the URL
        return res.send(message);
    }
);

//--------------------
// 'POST'
//--------------------
// Create
router.post('/',
    // Return Function
    async (req, res) => {
        // Create Message object to be inserted into DB
        const message = await req.context.models.Message.create(
            {
                text: req.body.text,
                user: req.context.me.id,
            }
        );

        // Return new message after it has been created
        return res.send(message);
    }
);

//--------------------
// 'PUT'
//--------------------
// Update
// TODO: PENDING FOR IMPLEMENTATION WITH DB
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
    async (req, res) => {
        // Finds Message to be deleted from DB
        const message = await req.context.models.Message.findById(
            req.params.messageId
        );

        if (message) 
        {
            await message.deleteOne();
        }

        // return res.send('Message deleted');
        return res.send(message);
    }
);

// Export Module (export the router NOT as an object inside { })
export default router;