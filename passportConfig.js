const LocalStrategy=require("passport-local").Strategy;
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;

const {  serializeUser } = require("passport");
const user=require("./models/Signupmodel");
const GOOGLE_CLIENT_ID = "370045885490-s6tt5dge6c4r09kha5duak90gtqqf7ck.apps.googleusercontent.com"
const GOOGLE_CLIENT_SECRET = "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"
authUser = (request, accessToken, refreshToken, profile, done) => {
  return done(null, profile);
}

exports.initializingPassport=(passport)=>{

      //Use "GoogleStrategy" as the Authentication Strategy
    passport.use(new GoogleStrategy({
        clientID:     GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:3001/auth/google/callback",
        passReqToCallback   : true
    }, 
    function(request,accessToken, refreshToken, profile, done) {
        console.log(profile);
        const data=  new user({_id:profile.id, username: profile.email,name:profile.displayName,password:"123456" });
        console.log("user data is",data);
        data.save();
          return done(null, profile);
    }
    
    ));



    passport.use(new LocalStrategy(
        function(username, password, done) {
          console.log("this function is being called",username);
          user.findOne({ username: username }, function (err, user) {
            if (err) { return done(err); }
            if (!user) { return done(null, false); }
            if (user.password!==password) { return done(null, false); }
            return done(null, user);
          });
        }
      ));
      passport.serializeUser((user,done)=>{
        if(user){
          console.log("Doing great "+user.id);
          console.log(user);
          return done(null,user.id);
        }
        return done(null,false);
      });
      passport.deserializeUser((id,done)=>{
      user.findById(id,(err,user)=>{
        if(err) return done(null,false);
        return done(null,user);
      })
      });
};