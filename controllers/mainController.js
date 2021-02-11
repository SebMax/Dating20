const mongoose = require('mongoose');
const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');
const userModel = require('../model/user');
const user = require('../model/userSchema');

class mainController {
    constructor(userModel) {
        this.userModel = userModel;
    };

    showHomePage = async (req, res) => {
        res.render('velkommen')
    };

    showLoginPage = async (req, res) => {
        res.render('login')
    };

    showRegister = async (req, res) => {
        res.render('register')
    };

    logout = async (req, res) => {
        req.logout();
        res.redirect('/login');
    };

    deleteUser = async (req, res) => {
        let deletedUser = await this.userModel.removeUser(req.session.passport.user);
        req.logout();
        res.redirect('/login');
    };

    showProfile = async (req, res) => {
        let loginUser = await this.userModel.getOneUserById(req.session.passport.user);
        res.render('profil', {user : loginUser});
    }

    showUpdateProfile = async (req, res) => {
        res.render('updatedProfile');
    };

   initialize(passport, getOneUserByEmail) {
        const AuthenticateUser = async (email, password, done) => {
            const user = await this.userModel.getOneUserByEmail(email);
            if (user == null) {
                return done(null, false, {message: "Emailen eksisterer ikke"})
            } else {              
                if (password == user.password) {
                    return done(null, user)
                } else {
                    return done(null, false, {message: "forkert adgangskode"})
                }
            }
        }
        passport.use(new LocalStrategy({usernameField: 'email', passwordField: 'password'}, AuthenticateUser));
        passport.serializeUser((user, done) => done(null, user._id));
        passport.deserializeUser((email, done) => {
            return done(null, this.userModel.getOneUserByEmail(email))
        });
    };

    getMatches = async (req, res) => {
        var loginUser = await this.userModel.getOneUserById(req.session.passport.user);

        var matchedArray = [];

        for(const item of loginUser.myMatches) {
            var matches = await this.userModel.getOneUserById(item);
            matchedArray.push(matches);
        }

        res.render('matches', {matches: matchedArray});
    }

    showMatches = async(req, res) => {
        var users = await this.userModel.getAll();
        var likes = await this.userModel.getLikedUsersByID(req.session.passport.user);
        var dislikes = await this.userModel.getDislikes(req.session.passport.user);
        
        const map = users.map(x => x._id);
        
        var userSort1 = map.filter(val => !dislikes.disliked.includes(val));

        var userSort2 = userSort1.find(val => !likes.liked.includes(val));
        var userSort3 = await this.userModel.getOneUserById(userSort2);
    
        if (userSort3 == null) {
            res.redirect('/profil');
        } else if (userSort3._id == req.session.passport.user) {
            var me = await this.userModel.likeOtherUsers(req.session.passport.user, req.session.passport.user);
            res.redirect('/swiping')
        } else {
            res.render('swiping', {match: userSort3});
            
        }


    }

    like = async (req, res) => {
        var liked = await this.userModel.likeOtherUsers(req.params.id, req.session.passport.user);
        var likedByOthers = await this.userModel.getLikesFromUsers(req.params.id, req.session.passport.user);

        var compare = likedByOthers.liked;

        if(compare.includes(req.session.passport.user) == true ) {
            await this.userModel.matchedUsers(req.params.id, req.session.passport.user);
            res.redirect('/swiping/match/' + req.params.id)
        } else {
            res.redirect('/swiping');
        }
    };

    dislikeOthers = async(req, res) => {
        await this.userModel.dislikeOtherUsers(req.params.id, req.session.passport.user);
        res.redirect('/swiping');
    }

    unmatch = async (req, res) => {
        await this.userModel.unmatchUsers(req.params.id, req.session.passport.user);
        res.redirect('/matches');
    };

    match = async (req,res) => {
        var matchNot = await this.userModel.getOneUserById(req.params.id);
        res.render('match', {match: matchNot});
    };        
} 

module.exports = mainController;
