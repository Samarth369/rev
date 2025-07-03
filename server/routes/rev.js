const express = require("express")
const revroutes = express.Router()
const userdb = require('../modules/user')
const revdb = require('../modules/testimonials')
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')
const ENV = require("../env/env")
const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })


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



revroutes.post( "/delrev" , async function ( req , res ) {
    const { id } = req.body

    let tempuser = await revdb.findOne({_id: id})
    let owner = tempuser.owner
     
    await userdb.updateOne({_id: owner} , {$pull: {ref: id}})
    await revdb.deleteOne({_id: id})
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
 


revroutes.post( "/revresponce" , upload.fields([{ name: 'photorev' , maxCount: 1 }]) , async function ( req , res ) {
    const { name , mail , sociallink , address , id } = req.body
    const responce = {}
    
    if (name) {
        responce.name = name
    }

    if (mail) {
        responce.mail = mail
    }

    if (sociallink) {
        responce.sociallink = sociallink
    }

    if (address) {
        responce.address = address
    }
    
    let img = req.files.photorev[0]
    
    if ( img ) {
        responce.img = [ img.mimetype , img.buffer ]
    }
    

    let asd = await revdb.updateOne(
        {_id: id},
        {$push: {responce: responce}}
    )

    console.log(asd);  
})


module.exports = revroutes