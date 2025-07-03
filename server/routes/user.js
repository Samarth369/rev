const express = require("express")
const routes = express.Router()
const userdb = require('../modules/user')
const revdb = require('../modules/testimonials')
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')
const ENV = require("../env/env")



routes.post( "/signup" , async function ( req , res ) {
    const { email , password , username } = req.body

    const useremail = await userdb.findOne({email: email})
    if (useremail) { return res.status(400).json({res: "use diffrent email"}) }
    
    const usernamec = await userdb.findOne({username: username})
    if (usernamec) { return res.status(400).json({res: "use diffrent username"}) }

    const hash = await bcrypt.hash(password, 8);

    await userdb.create({
        email: email,
        username: username,
        password: hash
    })

    return res.json({res: "user got created"})
})



routes.post( '/login' , async function ( req , res ) {
    const { username , password } = req.body
    
    const exitusername = await  userdb.findOne({username: username})
    
    if ( !exitusername ) {
        return res.json({
            res: "User already exits"
        })
    }

    const match = await bcrypt.compare( password, exitusername.password )

    if (match == false) {
        res.json({
            res: "password is wrong"
        })
    }
    
    if ( username && match ) {
        const token = jwt.sign( exitusername._id.toString() , ENV.SRC )
        return res.json({
            token: token
        })
    }
})



routes.get( '/getdb' , async function ( req , res ) {
    const db = await userdb.find({})
    const redb = await revdb.find({})

    res.json({ db , redb })
})



routes.get( '/clearevdb' , async function ( req , res ) {
    await revdb.deleteMany({})
    res.send("DB cleared")
})



routes.get( '/cleardb' , async function ( req , res ) {
    await userdb.deleteMany({})
    await revdb.deleteMany({})
    
    res.send("DB cleared")
})



module.exports = routes