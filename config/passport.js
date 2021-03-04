require('dotenv').config();
// A passport strategy for authenticating with a JSON Web Token
// This allows to authenticate endpoints using a token
const JWTStrategy = require('passport-jwt').Strategy
const ExtractJwt= require('passport-jwt').ExtractJwt
const mongoose = require('mongoose');

//import user model 
const { User } = require('../models/user');

const options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = process.env.JWT_SECRET;

module.exports = (passport) => {
    passport.use(new Strategy(options, (jwt_payload, done) => {
        //Have a user that were find by the id inside of the payload
        //when we get the user back, we will check to see if user in DB
        User.findById(jwt_payload.id).then((user) => {
            //jwt_payload is an object that contains JWT info
            //done is a callback that we will be return user or false
            if(user){
                //if a user is found, return done with null(for error)
                return done(null, user);
            }else {
                //no user was found
                return done(null, false)
            }
        })
        .catch(error => {
            console.log(`====> Error below (passport.js)`)
            console.log(error)
        })
    }))
}