//====================
// Model: Message
//====================
// Import Dependencies
import mongoose from 'mongoose';

//--------------------
// Schema Definition
//--------------------
const messageSchema = new mongoose.Schema(
    {
        text: {
            type: String,
            required: true
        },
        //--------------------
        // Associations
        //--------------------
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    {
        timestamp: true // Used to have createdAt & updatedAt fields
    }
);

//--------------------
// Methods
//--------------------

//--------------------
// Model Definition
//--------------------
const Message = mongoose.model('Message', messageSchema);

//--------------------
// Export Module
//--------------------
export default Message;