//====================
// Model: User
//====================
// Import Dependencies
import mongoose from "mongoose";

//--------------------
// Schema Definition
//--------------------
const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true
        }
    },
    {
        timestamp: true // Used to have createdAt & updatedAt fields
    }
);

//--------------------
// Methods
//--------------------
// Method that allows a User to login either with an email or a username. For this tutorial User only has username
userSchema.statics.findByLogin = async function(login) {
    let user = await this.findOne({
        username: login
    });

    if (!user) 
    {
        user = await this.findOne({
            email: login
        });
    }

    return user;
};

//--------------------
// Hooks
//--------------------
// In case a user is deleted, we may want to perform a so-called cascade delete for all messages in relation 
// to the user. That's why you can extend schemas with hooks. In this case, we add a pre hook to our user schema 
// to remove all messages of this user on its deletion
userSchema.pre('remove', function(next) {
    this.model('Message').deleteMany(
        {
            user: this._id
        },
        next
    );
});

//--------------------
// Model Definition
//--------------------
const User = mongoose.model('User', userSchema);

//--------------------
// Export Module
//--------------------
export default User;