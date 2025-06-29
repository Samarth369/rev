const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose")
const routes = require('./routes/user')
const revroutes = require("./routes/rev")

mongoose.connect("mongodb://localhost:27017/rev").then(console.log("connected"))

const app = express()
app.use(cors())
app.use(express.json())
app.use(routes)
app.use(revroutes)

app.listen(3000)
