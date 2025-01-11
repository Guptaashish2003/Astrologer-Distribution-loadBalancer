const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    astrologer:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Astrologer',
    },
    
    
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;