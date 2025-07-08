const express = require("express")
const userdb = require('../modules/user')
const revdb = require('../modules/testimonials')
const jwt = require("jsonwebtoken")
const ENV = require('../env/env')

const state = express.Router()

state.post( '/getstates' , async function ( req , res ) {
    const { revid , token } = req.body    

    let rev = await revdb.findOne({_id: revid[0]})

    jwt.verify( token , ENV.SRC , function ( err , decode ) {
        if ( err ) {
            return res.json({
                res : "there is a err in json"
            })            
        }

        if ( decode == rev.owner ) {            
            return res.json({
                data: rev.responce
            })
        }
    })
})

module.exports = state



