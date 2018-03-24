const express = require('express');
const app =  express();
const mongoose = require('mongoose');
const Task = require('./models/tasks.js');
const methodOverride = require('method-override');

app.use(express.urlencoded({extended:false}));
app.use(methodOverride('_method'));

app.get('/tasks/seed', (req,res)=>{
    Task.create([
        {
            description: 'Load moving truck',
	        budget: '$150',
	        location: 'Peoria',
	        duedate: 'April 20th'
        },
        {
            description: 'Paint house',
	        budget: '$500',
	        location: 'Peoria',
	        duedate: 'April 21st'
        },
        {
            description: 'Mount various flatscreens',
	        budget: '$100',
	        location: 'Scottsdale',
	        duedate: 'April 5th'
        },
        {
            description: 'Walk dogs',
	        budget: '$50',
	        location: 'Central Park',
	        duedate: 'April 1st'
        },
    ], (err, data)=>{
        res.redirect('/tasks');
    });
});

// index
app.get('/tasks/', (req,res)=>{
    Task.find({}, (err, allTasks)=>{
        res.render('index.ejs', {
            tasks: allTasks
        });
    });
});

// new
app.get('/tasks/new', (req,res)=>{
    res.render('new.ejs');
});

// show
app.get('/tasks/:id', (req,res)=>{
    Task.findById(req.params.id, (err, foundTask)=>{
        res.render('show.ejs', {
            task:foundTask
        });
    });
});

// create
app.post('/tasks/', (req,res)=>{
    Task.create(req.body, (err, createdTask)=>{
        res.redirect('/tasks');
    });
});

// delete
app.delete('/tasks/:id', (req,res)=>{
    Task.findByIdAndRemove(req.params.id, (err, data)=>{
        res.redirect('/tasks');
    });
});

// edit
app.get('/tasks/:id/edit', (req,res)=>{
    Task.findById(req.params.id, (err, foundTask)=>{
        res.render('edit.ejs', {
            task: foundTask
        });
    });
});

// put
app.put('/tasks/:id', (req,res)=>{
    Task.findByIdAndUpdate(req.params.id, req.body, (err, updatedModel)=>{
        res.redirect('/tasks');
    });
});


mongoose.connect('mongodb://localhost:27017/taskit');
mongoose.connection.once('open', ()=>{
    console.log('connected to mongod . . .');
});

app.listen(3000, ()=>{
    console.log('listening. . .');
});
