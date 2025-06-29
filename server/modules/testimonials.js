const mongoose = require("mongoose")

const rev = mongoose.Schema({
    spacename: {
        type:String,
        required: true,
        unique: true
    },
    htmlcontent: {
        type: String,
        required: true,
    },
    imgbuff: {
        type: String
    },
    owner: {
        type: String,
        required: true
    }
})

const revdb = mongoose.model("rev",revdb)

module.exports = revdb