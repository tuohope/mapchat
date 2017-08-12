var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');
var io = require('../app').io;


router.get('/',function (req,res,next) {
    if (req.user === undefined){
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
    User.update({username:req.user.username}, {
        $set:{isOnline : false}
    },function (err,doc) {
        if (err) {return next(err);}
        io.emit("user logout", req.user);
        req.logout();
        res.redirect('/login');
    });
});

router.get('/index', function(req, res, next) {
    if (req.user === undefined){
        res.redirect('/login');
    }else{
        res.render('index',{user:req.user});
    }
});

router.post('/login', function (req,res,next) {
    passport.authenticate('local', function(err, user, info) {
        if (err) { return next(err); }
        if (!user) { return res.redirect('/login'); }

        req.logIn(user, function(err) {
            if (err) { return next(err); }


            User.update({username:req.user.username}, {
                $set:{isOnline : true}
            },function (err,doc) {
                if (err) {return next(err);}
                io.emit("user login", req.user);
                return res.redirect('/index');
            });
        });
    })(req, res, next);

});

router.post('/signup',function (req,res,next) {
    console.log(req.body);

    User.register(new User({username: req.body.username, nickname:req.body.nickname, avatar_url: req.body.avatar_url, lat:0,lon:0,isOnline:true}), req.body.password, function (err,doc) {
        if (err){
            return res.render('signup', {message:err})
        }

        passport.authenticate('local')(req,res,function () {
            res.redirect('/index');
        })

    })
});

router.get('/api/user',function (req,res,next) {
    User.find({},function (err,doc) {
        if (!err){
            res.send(doc);
            return
        }
        res.send(err);
    })

});

module.exports = router;
