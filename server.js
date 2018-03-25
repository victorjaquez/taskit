// ==================== DEPENDENCIES ====================
const express = require('express');
const app =  express();
const session = require('express-session');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

// ===================== MIDDLEWARE =====================
// body parser
app.use(express.urlencoded({extended:false}));
// method override
app.use(methodOverride('_method'));
// static files
app.use(express.static('public'));

// sessions
app.use(session({
    secret: 'feedmeseymour',
    resave: false,
    saveUninitialized: false
}));

app.get('/encrypt-pwd/:pwd', (req,res)=>{
    const hashedString = bcrypt.hashSync(req.params.pwd, bcrypt.genSaltSync(10));
    req.session.pwd = hashedString;
    res.send(hashedString);
});

app.get('/login/:pwd', (req, res)=>{
    const loggedIn = bcrypt.compareSync(req.params.pwd, req.session.pwd);
    if(loggedIn){
        res.send('welcome back');
    } else {
        res.send('try again')
    }
});

app.get('/save/:username', (req, res)=>{
    req.session.username = req.params.username;
    res.send('saved!');
});

app.get('/destroy', (req,res)=>{
    req.session.destroy((err)=>{
        res.redirect('/home')
    });
});

app.get('/update/:username', (req, res)=>{
    req.session.username = req.params.username;
    res.send('updated!');
})

app.get('/', (req, res)=>{
    res.render('home.ejs', {
        currentUser: req.session.currentuser
    });
});

// ==================== CONTROLLERS =====================
// user
const usersController = require('./controllers/users.js');
app.use('/users', usersController);

// sessions
const sessionsController = require('./controllers/sessions.js');
app.use('/sessions', sessionsController);

// tasks
const tasksController = require('./controllers/tasks.js');
app.use('/tasks', tasksController);

// ====================== GET ROUTES ====================
// main home route
app.get('/', (req, res)=>{
    if(req.session.currentuser){
        res.send('the dedicated page');
    } else {
        res.redirect('/sessions/new');
    }
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
