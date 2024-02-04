const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    user_type: {
        type: String,
        required: true
    },
    last_login: {
        type: Date,
        default: Date.now()
    },
    newMessage: {
        type: Object,
        default: {}
    },
    scannedItems: {
        type: [String],
        default: []
    },
    lastScan: {
        type: [Date],
        default: []
    }
}, { minimize: false })
UserSchema.pre('save', async function (next) {
    const user = this;
    if (!user.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    next();
});

const userModel = mongoose.model('user', UserSchema)
module.exports = userModel