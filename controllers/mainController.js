const mongoose = require('mongoose');
const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');
const userModel = require('../model/user');
const User = require('../model/userSchema');

class mainController {
    constructor(userModel) {
        this.userModel = userModel;
    };

    showHomePage = async (req, res) => {
        res.render('homepage')
    };

    showLoginPage = async (req, res) => {
        res.render('login')
    };

    showRegister = async (req, res) => {
        res.render('register')
    };

    logout = async (req, res) => {
        req.logout();
        res.redirect('/homepage');
    };

    deleteUser = async (req, res) => {
        let deletedUser = await this.userModel.deleteUser(req.session.passport.user);
        req.logout();
        res.redirect('/homepage');
    };

    showProfile = async (req, res) => {
        let loginUser = await this.userModel.getOneUserById(req.session.passport.user);
        res.render('profile', {user : loginUser});
    }

    showUpdateProfile = async (req, res) => {
        res.render('updatedProfile');
    };

    initialize(passport, returnOne) {
        const AuthenticateUser = async (email, password, done) => {
            const User = await this.userModel.getOneUserByEmail(email);
            if (User == null) {
                return done(null, false, {message: "Emailen eksisterer ikke"})
            } else {
                if (password == User.password) {
                    return done(null, User)
                } else {
                    return done(null, false, {message: "forkert adgangskode"})
                }
            }
        }
        passport.use(new LocalStrategy({usernameField: 'email', passwordField: 'password'}, AuthenticateUser));
        passport.serializeUser((User, done) => done(null, User._id));
        passport.deserializeUser((email, done) => {
            return done(null, this.userModel.getOneUserByEmail(email))
        });
    };
    verifiedUser(req, res, next) {
        if(req.isAuthenticated()) {
            return res.redirect('/profil')
        }
        next()
    };
    notVerified(req, res, next) {
        if(req.isAuthenticated()) {
            return next()
        }
        res.redirect('/login')
    };
}

module.exports = mainController;
