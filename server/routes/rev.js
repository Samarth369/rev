const express = require("express")
const revroutes = express.Router()
const userdb = require('../modules/user')
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')
const ENV = require("../env/env")
const multer  = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })


revroutes.post( '/createrev' , upload.single('logo') , async function ( req , res ) {
    const { livepage , spacename , token , img } = req.body
    console.log(img);
    
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