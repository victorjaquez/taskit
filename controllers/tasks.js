const express = require('express');
const router = express.Router();
const session = require('express-session');
const Task = require('../models/tasks.js');
const bcrypt = require('bcrypt');
// new
router.get('/new', (req,res)=>{
    if(req.session.currentuser){
        res.render('new.ejs');
    } else {
        res.redirect('/sessions/new')
    }
});

// create
router.post('/', (req,res)=>{
    req.body.user_id = req.session.currentuser._id // creates it with user_id and designates the object to it
    Task.create(req.body, (err, createdTask)=>{
        res.redirect('/tasks');
    });
});

// index
router.get('/', (req,res)=>{
    if(req.session.currentuser){
        Task.find({user_id:req.session.currentuser._id}, (err, allTasks)=>{  // looks for current user id, and all stuff associated to it
            res.render('index.ejs', {
                tasks: allTasks
            })
        })
    } else {
        res.redirect('/sessions/new')
    }
});

// show
router.get('/:id', (req,res)=>{
    Task.findById(req.params.id, (err, foundTask)=>{
        res.render('show.ejs', {
            task:foundTask
        });
    });
});

// delete
router.delete('/:id', (req,res)=>{
    Task.findByIdAndRemove(req.params.id, (err, data)=>{
        res.redirect('/tasks');
    });
});

// edit
router.get('/:id/edit', (req,res)=>{
    Task.findById(req.params.id, (err, foundTask)=>{
        res.render('edit.ejs', {
            task: foundTask
        });
    });
});

// put
router.put('/:id', (req,res)=>{
    Task.findByIdAndUpdate(req.params.id, req.body, (err, updatedModel)=>{
        res.redirect('/tasks');
    });
});

module.exports = router;
