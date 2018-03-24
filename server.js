const express = require('express');
const app =  express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');

app.use(express.urlencoded({extended:false}));
app.use(methodOverride('_method'));

const tasksController = require('./controllers/tasks.js');
app.use('/tasks', tasksController);

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

mongoose.connect('mongodb://localhost:27017/taskit');
mongoose.connection.once('open', ()=>{
    console.log('connected to mongod . . .');
});

app.listen(3000, ()=>{
    console.log('listening. . .');
});
