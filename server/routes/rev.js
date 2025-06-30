const express = require("express")
const revroutes = express.Router()
const userdb = require('../modules/user')
const revdb = require('../modules/testimonials')
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')
const ENV = require("../env/env")



revroutes.post( '/createrev' , async function ( req , res ) {
    const { livepage , spacename , token } = req.body
    
    let userid;

    jwt.verify( token , ENV.SRC , function ( err , decoded ) {
        if ( err ) {
            console.log("400");
            return res.sendStatus(400)
        }
        if ( decoded ) {
            userid = decoded
        }
    })

    let rev = await revdb.create({
        spacename: spacename,
        htmlcontent: livepage,
        owner: userid
    })

    let asd = await userdb.updateOne( 
        {_id: userid} ,
        {$push: {ref: rev._id.toString()}}
    )
})

revroutes.post( "/getrev" , async function ( req , res ) {
    const { id } = req.body

    let page = await revdb.findOne({_id: id})

    if ( page ) {
        res.json(page)
    } else {
        res.send("na na na")
    }
})
 

module.exports = revroutes