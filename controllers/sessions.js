const express = require('express');
const router = express.Router();
const session = require('express-session');
const User = require('../models/users.js');
const bcrypt = require('bcrypt');

router.get('/new', (req,res)=>{
    res.render('sessions/new.ejs');
});

router.post('/', (req,res)=>{
    User.findOne({username: req.body.username}, (err, foundUser)=>{
        if(bcrypt.compareSync(req.body.password, foundUser.password)){
            req.session.currentuser = foundUser;
            res.redirect('/');
        } else {
            res.send('wrong password');
        }
    });
});

router.delete('/', (req, res)=>{
    req.session.destroy(()=>{
        res.redirect('/')
    });
});

module.exports = router;
