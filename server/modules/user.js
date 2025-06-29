const mongoose = require("mongoose")

const usersvhema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    ref: {
        type: Array
    }
})

const userdb = mongoose.model("user",usersvhema)

module.exports = userdb;