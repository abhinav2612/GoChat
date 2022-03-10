const flash = require('connect-flash/lib/flash');
const User = require('../models/user');

// render the sign up page
module.exports.signUp = function(req, res) {
    if(req.isAuthenticated()){
        return res.redirect('/');
    }

    return res.render('user_sign_up', {
        title: 'Sign up',
    });
}

// render the sign in page
module.exports.signIn = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/');
    }

    return res.render('user_sign_in', {
        title: "Login"
    })
}

// get the sign up data
module.exports.create = function(req, res){
    if (req.body.password != req.body.confirm_password){
        req.flash('error', 'Passwords do not match');
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function(err, user){
        if(err){req.flash('error', err); return}

        if (!user){
            User.create(req.body, function(err, user){
                if(err){req.flash('error', err); return}

                return res.redirect('/users/sign-in');
            })
        }else if(user){
            req.flash('error', 'User already exists');
            return res.redirect('back');
        }
        else{
            req.flash('success', 'You have signed up, login to continue!');
            return res.redirect('back');
        }

    });
}


// sign in and create a session for the user
module.exports.createSession = function(req, res) {
    User.findOne({email: req.body.email}, function(err, user){
        if(user.password != req.body.password){
            req.flash('error', 'Invalid password');
            return res.redirect('back');
        }
        return res.redirect('/');
    });
}

module.exports.destroySession = function(req, res){
    req.logout();
    req.flash('success', 'You have logged out!');


    return res.redirect('/');
}