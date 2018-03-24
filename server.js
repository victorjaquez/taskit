// ==================== DEPENDENCIES ====================
const express = require('express');
const app =  express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');

// ===================== MIDDLEWARE =====================
// body parser
app.use(express.urlencoded({extended:false}));
// method override
app.use(methodOverride('_method'));
// static files
app.use(express.static('public'));

// ==================== CONTROLLERS =====================
// tasks
const tasksController = require('./controllers/tasks.js');
app.use('/tasks', tasksController);

// ====================== GET ROUTES ====================
// main home route
app.get('/', (req, res)=>{
    res.render('home.ejs');
});

// ============ MONGOOSE CONNECTION/HEROKU ===============
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/taskit';
mongoose.connect(mongoURI);

mongoose.connection.once('open', ()=>{
    console.log('connected to mongod . . .');
});

// ====================== LISTENER ======================
const port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log('listening. . .');
});
