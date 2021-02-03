const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bodyParse = require('body-parser');
var jsonParser = bodyParse.json();
const Contact = require('../models/contactsModel')

//Getting data from DB
router.get('/contacts', (req, res) => {
    Contact.find({}, function (err, result) {
        if (err) throw err;
        res.json(result);
    });
});


//Post data in DB
router.post('/contacts', jsonParser, (req, res) => {
    let newContact = new Contact({
        _id: new mongoose.Types.ObjectId,
        fname: req.body.fname,
        lname: req.body.lname,
        age: req.body.age,
        mobile: req.body.mobile,
        skills: req.body.skills,

    });
    newContact.save().then((result) => {
        res.json(result);
    }).catch(err => (console.warn(err))
    );
});


//Delete data from DB
router.delete('/contacts/:id', function (req, res) {
    Contact.deleteOne({ _id: req.params.id }).then((result) => {
        res.json(result);
    }).catch((err) => console.warn(err));

});


//Update data in DB
router.put('/contacts/:id', jsonParser, function (req, res) {
    Contact.updateOne({ _id: req.params.id }, {
        $set: {
            fname: req.body.fname,
            lname: req.body.lname,
            age: req.body.age,
            mobile: req.body.mobile,
            skills: req.body.skills,
        }
    }).then((result) => {
        res.json(result);
    }).catch((err) => console.log(err));
});


//Sorting data in DB
router.get('/contacts/:name', function (req, res) {
    var regex = new RegExp(req.params.fname, 'i');
    Contact.find().sort({ fname: 1 }).then((result) => {
        res.json(result);
    })
})


module.exports = router;