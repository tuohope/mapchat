var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');


router.get('/',function (req,res,next) {
    if (req.user == undefined){
        res.redirect('/login');
    }else{
        res.redirect('/index');
    }
});


router.get('/login', function(req, res, next) {
    res.render('login')
});

router.get('/signup', function(req, res, next) {
    res.render('signup')
});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/login');
});

router.get('/index', function(req, res, next) {
    if (req.user === undefined){
        res.redirect('/login');
    }else{
        res.render('index',{user:req.user});
    }
});

router.post('/login',passport.authenticate('local', { successRedirect: '/index',
    failureRedirect: '/login' }), function (req,res,next) {
});

router.post('/signup',function (req,res,next) {
    console.log(req.body);

    User.register(new User({username: req.body.username, nickname:req.body.nickname, avatar_url: req.body.avatar_url}), req.body.password, function (err,doc) {
        if (err){
            return res.render('signup', {message:err})
        }

        passport.authenticate('local')(req,res,function () {
            res.redirect('/index');
        })

    })
});

module.exports = router;
