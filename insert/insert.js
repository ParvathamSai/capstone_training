//import modules
const express = require('express')
let mongodb = require('mongodb')
//import url
const url = require('../url')
//create mongoclient
let mcl = mongodb.MongoClient
//create router instance
let router = express.Router()
//database name
let dbName = 'miniprj'
//create restapi
router.post("/", (req, res) => {
	let obj = req.body
	//connect to mongodb
    mcl.connect(url, (err, conn) => {
    	if (err)
            console.log('Error in connection :- ', err)
    	else {
        	let db = conn.db(dbName)
            db.collection('products').insertOne(obj, (err) => {
    	        if (err)
                    res.json({ 'insert': 'Error ' + err })
                else {
                    console.log("Data inserted")
                    res.json({ 'insert': 'success' })
                    conn.close()
                }
        	})
    	}
	})
})
 
//Insert User
router.post("/createUser", (req, res) => {
	let obj = {
    	"userid": req.body.userid,
    	"u_name": req.body.u_name,
    	"upwd": req.body.upwd,
    	"u_email": req.body.u_email,
    	"u_addr": req.body.u_addr,
    	"u_contact": req.body.u_contact
	}
	//connect to mongodb
    mcl.connect(url, (err, conn) => {
    	if (err)
            console.log('Error in connection :- ', err)
    	else {
        	let db = conn.db(dbName)
            db.collection('users').insertOne(obj, (err) => {
                if (err)
                    res.json({ 'userInsert': 'Error ' + err })
                else {
                    console.log("User inserted")
                    res.json({ 'userInsert': 'success' })
                    conn.close()
                }
        	})
    	}
	})
})

//insert product into cart
router.post("/cartInsert", (req, res) => {
	let obj = {
    	"p_id": req.body.p_id,
    	"p_cost": req.body.p_cost,
    	qty: 1,
    	"p_img": req.body.p_img,
    	"u_name": req.body.u_name
	}
	//connect to mongodb
    mcl.connect(url, (err, conn) => {
    	if (err)
            console.log('Error in connection :- ', err)
    	else {
        	let db = conn.db(dbName)
            db.collection('cart').insertOne(obj, (err) => {
                if (err)
                    res.json({ 'cartInsert': 'Error ' + err })
                else {
                    console.log("Prouct in Cart inserted")
                    res.json({ 'cartInsert': 'success' })
                    conn.close()
                }
            })
    	}
	})
})
 
//export router
module.exports = router

