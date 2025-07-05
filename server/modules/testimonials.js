const mongoose = require("mongoose")

const rev = mongoose.Schema({
    spacename: {
        type:String,
        required: true,
    },
    htmlcontent: {
        type: String,
        required: true,
    },
    owner: {
        type: String,
        required: true
    },
    responce: {
        type: Array
    }
})

const revdb = mongoose.model("rev",rev)

module.exports = revdb