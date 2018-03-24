const express = require('express');
const router = express.Router();
const Task = require('../models/tasks.js');

// new
router.get('/new', (req,res)=>{
    res.render('new.ejs');
});

// create
router.post('/', (req,res)=>{
    Task.create(req.body, (err, createdTask)=>{
        res.redirect('/tasks');
    });
});

// index
router.get('/', (req,res)=>{
    Task.find({}, (err, allTasks)=>{
        res.render('index.ejs', {
            tasks: allTasks
        });
    });
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
