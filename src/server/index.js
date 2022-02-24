const express = require('express');
const routes = require('../routes');
var path = require ('path');
const models = require('../database/models');

require('dotenv').config()
const passport = require('passport');
const cookieSession = require('cookie-session')
require('./passport-setup');

const app = express();

const viewspath = path.join(__dirname,"../views")
app.set("views", viewspath);
app.set('view engine','ejs')


app.use(express.json());

// For an actual app you should configure this with an experation time, better keys, proxy and secure
app.use(cookieSession({
    name: 'tuto-session',
    keys: ['key1', 'key2']
  }))



// Auth middleware that checks if the user is logged in
const isLoggedIn = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.sendStatus(401);
    }
}

// Initializes passport and passport sessions
app.use(passport.initialize());
app.use(passport.session());

// Example protected and unprotected routes
app.get('/', (req, res) => res.render('index'))
app.get('/failed', (req, res) => res.send('You Failed to log in!'))

// In this route you can see that if the user is logged in u can acess his info in: req.user
app.get('/success', isLoggedIn, async(req, res) =>{
    res.render("profile",{name:req.user.displayName,pic:req.user.photos[0].value,email:req.user.emails[0].value})

        const user = {
            email:req.user.emails[0].value,
            googleId:req.user.sub,
            information:req.user.displayName,
            picture:req.user.photos[0].value
        }
        const createdUser = await models.User.create(user);
        console.log(createdUser);
})

// Auth Routes
app.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/google/callback', passport.authenticate('google', { failureRedirect: '/failed' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/success');
  }
);

app.get('/logout', (req, res) => {
    req.session = null;
    req.logout();
    res.redirect('/');
})

// app.use(cookieParser());
// app.use(express.static('public'));
// app.use(express.static(__dirname + '../public'));

app.use('/api', routes);

// app.get('/', (req, res)=>{
//     res.render('index')
// })

module.exports = app;