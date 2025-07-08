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


revroutes.post( '/createrev' , upload.single("file") , async function ( req , res ) {
    const { livepage , spacename , token } = req.body
    console.log(req.file);
    
    if ( !spacename ) {
        return res.json({
            res: "no space name"
        })
    }
    
    let userid;

    jwt.verify( token , ENV.SRC , function ( err , decoded ) {
        if ( err ) {
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

    if ( rev ) {
        res.json({
            res: "created rev"
        })
    }

    let asd = await userdb.updateOne( 
        {_id: userid} ,
        {$push: {ref: [rev._id.toString() , spacename]}}
    )
})



revroutes.post( "/delrev" , async function ( req , res ) {
    const { id } = req.body

    let tempuser = await revdb.findOne({_id: id[0]})
    
    let owner = tempuser.owner
     
    await userdb.updateOne({_id: owner} , {$pull: {ref: id}})
    await revdb.deleteOne({_id: id[0]})
})



revroutes.post( "/getrev" , async function ( req , res ) {
    const { id } = req.body

    let page = await revdb.findOne({_id: id})

    if ( page ) {
        res.json(page)
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
    
    try{
        let img = req.files.photorev[0]
        if ( img ) {
            responce.img = [ img.mimetype , img.buffer ]
        }
    } 
    catch{}


    let asd = await revdb.updateOne(
        {_id: id},
        {$push: {responce: responce}}
    )
})


module.exports = revroutes