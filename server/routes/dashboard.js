const express = require("express")
const routes = express.Router()
const userdb = require('../modules/user')
const revdb = require('../modules/testimonials')
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')
const ENV = require("../env/env")

const dash = express.Router()

dash.post( '/dash' , async function ( req , res ) {
    const { token } = req.body

    let userid = jwt.verify( token , ENV.SRC , )

    let user = await userdb.findOne({_id: userid})    
    res.json({
        link: user.ref 
    })
})

module.exports = dash