import passport from 'passport'; 
import LocalStrategy from 'passport-local';
import session from 'express-session';
import db from './db.js'
import CryptoJS from 'crypto-js'; 
import Bcrypt from 'bcrypt';


class Authentication {
    constructor(app) {
        app.use(session({
            secret: "secret",
            resave: false,
            saveUninitialized: true,
        }));

        app.use(passport.initialize()); 
        app.use(passport.session());
        passport.use(new LocalStrategy(this.verifyIdentity));
        
        passport.serializeUser((user, done) => done(null, user));
        passport.deserializeUser((user, done) => done(null, user));
    }
    async verifyIdentity(username, password, done ) { 
        const key = "CINEMAX - API";
        const user = CryptoJS.AES.decrypt(username, key).toString(CryptoJS.enc.Utf8); 
        const pass = CryptoJS.AES.decrypt(password, key).toString(CryptoJS.enc.Utf8);
        const query = { username: user};
        const collection = db.collection("users");  
        const usernameFromDB = await collection.findOne(query);  
        if (!usernameFromDB) {
            
            return done(new Error('Invalid username or password'));
        }

    
        
        const isMatch = await Bcrypt.compare(pass, usernameFromDB.password); 
       
        if (!isMatch) {
            return done(new Error('Invalid password'));
        }

        
        console.log("Login OK");
        return done(null, usernameFromDB);
    
    }

    checkAuthenticated(username, password, next) {
        if (username.isAuthenticated()) { 
            console.log("Login NOOK");
            return next(); 
        }
        password.redirect("/login");
    }
    
}

export default Authentication;


