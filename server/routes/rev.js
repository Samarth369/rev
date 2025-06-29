const express = require("express")
const revroutes = express.Router()
const userdb = require('../modules/user')
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')
const ENV = require("../env/env")



revroutes.post( '/createrev' , async function ( req , res ) {
    const { livepage , spacename , token } = req.body
    console.log(req.body);
    
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

    // const user = await userdb.updateOne(
    //     {_id: userid},
    //     {$push: {ref: "8743568w7346f587w34698756378456"}}
    // )
})

revroutes.get( '/form' , function ( req , res ) {
    console.log(req.body);

    res.send('asdad')
    
})
 

module.exports = revroutes