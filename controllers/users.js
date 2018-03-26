const express = require('express');
const router = express.Router();
const session = require('express-session');
const User = require('../models/users.js');
const Task = require('../models/tasks.js');
const bcrypt = require('bcrypt');

// new
router.get('/new', (req, res)=>{
    res.render('users/new.ejs')
});

// create/sign up
router.post('/', (req, res)=>{
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    User.create(req.body, (err, createdUser)=>{
        if (err){
            console.log(err);
        } else {
            res.redirect('/sessions/new')
        }

    });
});

module.exports = router;
