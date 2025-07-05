const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose")

const routes = require('./routes/user')
const revroutes = require("./routes/rev")
const dash = require('./routes/dashboard')
const state = require('./routes/state')

mongoose.connect("mongodb://localhost:27017/rev")

const app = express()
app.use(cors())
app.use(express.json())
app.use(routes)
app.use(revroutes)
app.use(dash)
app.use(state)

app.listen(3000)
