



const express=require("express");
const app=express();
const cors=require("cors");
const path =require('path');
const passport = require("passport");
const mongoose=require("mongoose");
const session = require('express-session');
console.log("welcome to backend");
const user=require("./models/Signupmodel");
let userProfile=null;
app.use(cors()); 
app.use(express.json());
app.use(express.urlencoded({extended:false}));
require("dotenv").config();

const port = process.env.PORT || 3001;

const {initializingPassport}=require("./passportConfig.js")
app.use(session({
    secret:'keyboard cat',
    resave:false,
    saveUninitialized: true
}))
//********* */ Passport part authentication**************
initializingPassport(passport);
app.use(passport.initialize());

app.use(passport.session());


// IS It Already authenticated ? Let's check it here -->
function isAuthenticated(req,res,done){
    console.log(req.user+" mc");
    if(req.user){
      userProfile=req.user;
      return done();
  
    }
    return false;
  }
  app.get("/isAuthenticated",isAuthenticated, async(req,res)=>{
    
  
   await res.send(true);
   
  })
  app.post("/logout",async (req,res)=>{
   await req.logout();
    res.send("Logged Out");
  })


// Database part ***********


mongoose.connect("mongodb+srv://workzone:workzone%40123@cluster0.8pfbz.mongodb.net/workzone?retryWrites=true&w=majority"                                                                                                  ,{
useNewUrlParser:true
}).catch(error=> console.error(error));


// **********Given below are authentication system for both local and google login

app.post("/register",async(req,res)=>{
    const registerName=req.body.registerName;
    const registerMail=req.body.registerMail;
    const registerPass=req.body.registerPass;
    console.log(req.body);
    // console.log("u are called from frontend"+" "+req+" "+registerName+" "+ registerMail+" "+registerPass);
 
    const data=  new user({ _id:new mongoose.Types.ObjectId(), name:registerName,username:registerMail,password: registerPass,tasks:[]});
    console.log(data);
    try{
    await data.save();
    res.send("inserted data");
    }
    catch(err){
    console.log("Error related to Inserting data in database",err);
    }
});

app.post('/login', passport.authenticate('local'),(req,res)=>{
 
  
    res.send({isAuthenticated:true});
    // console.log(req.body.username);
    
    });


    app.get('/auth/google',
    passport.authenticate('google', { scope: [ 'email', 'profile' ],
  }),(req,res)=>{
      console.log("u have been called");
  });
  app.get('/auth/google/callback', passport.authenticate( 'google'),(req,res)=>{
    console.log("Bahot Sahi beta")

    res.send("<script>window.location='http://localhost:3000/'</script>");
    
  });

  app.get("/profile",async(reqs,res)=>{
    
       res.send(userProfile);

    });

// ***********************************************************

app.post("/newproject",async(req,res)=>{
  const userid=req.user.id;
  const projectid=req.body.projectid;
  const sDate=req.body.sDate;
  const eDate=req.body.eDate;
  const status=req.body.pstatus;
  const descp=req.body.descp;
  console.log(userid+" "+projectid)
  user.findOneAndUpdate(
    { _id:userid }, 
    { $push: { 
              project: {
                _id :projectid,
                status:status,
                sdate:sDate,
                edate:eDate,
                description:descp,
                }  
            } 
    }).exec()
 
  
 console.log("updated");
})

app.post("/sentReq",async(req,res)=>{
  const userid=req.user.id;
  const name=req.user.username;
  const friendid=req.body.friendid;
  const friendname=req.body.friendname;
  const projectid=req.body.projectid;

 console.log(userid+" "+friendid)
console.log("you sent req to", friendname)
 user.findOneAndUpdate(
  {_id:userid},
  { $push: { 
    
        'project.$[project].sentRequest':{_id:friendid,username:friendname}
      } 

  },
  {arrayFilters:[{'project._id':projectid}]}).exec()
 
 user.findOneAndUpdate(
  { _id:friendid }, 
  {
    $push:{requests:{
      _id:userid,
      projectid:projectid,
      username:name
    }
  }
},
 ).exec()
 
});
app.get("/fetchAll",(req,res)=>{
  user.find({}, function(err, users) {
    var userMap = [];

    users.forEach(function(user) {
      userMap.push(user);
    });

    res.send(userMap);  
  });
});
app.post("/acceptRequest",(req,res)=>{
  
  const userid=req.user.id;
  const projectid=req.body.projectid;
 const friendid=req.body.friendid;
 console.log("You are getting called",userid,friendid)
 user.findOneAndUpdate(
  { _id:userid }, 
  { $push: { 
            project: {
              _id :projectid,
              requestid:friendid
              }  
          } 
  }).exec()
  user.findOneAndUpdate(
    { _id:userid }, 
    { $pull: { 
              requests: {
                _id :friendid,
                projectid:projectid
                }  
            } 
    }).exec()
  // user.findOneAndUpdate({_id:userid},
  //   { $pull: { 'requests': { '_id': friendid} } }
  //   ).exec()
      res.redirect("/removeRequest")
});
app.post("/removeRequest",(req,res)=>{
  
  const userid=req.user.id;
  const projectid=req.body.projectid;
 const friendid=req.body.friendid;
 console.log("You are getting called",userid,friendid)
 user.findOneAndUpdate(
  { _id:userid }, 
  { $pull: { 
            requests: {
              _id :friendid,
              projectid:projectid
              }  
          } 
  }).exec()

       
});
app.post("/addTask",(req,res)=>{
const tname=req.body.tname;
const personid=req.body.tperson;
const userid=req.user.id;
const username=req.user.name;
const projectid=req.body.pid;
const sdate=req.body.sdate;
const edate=req.body.edate;


console.log("det is", tname,userid,personid,projectid,sdate,edate);
user.findOneAndUpdate(
  {_id:userid},
  { $push: { 
    
        'project.$[project].tasks':{taskname:tname,sdate:sdate,edate:edate,assignTo:{name:"",id:personid}}
      } 

  },
  {arrayFilters:[{'project._id':projectid}]}).exec()
  user.findOneAndUpdate(
    { _id:personid }, 
    { $push: { 
              tasks: {
                userid :userid,
                username:username,
                project:projectid,
                taskname:tname,
                sdate:sdate,
                edate:edate,
                
                }  
            } 
    }).exec()
});
app.post("/findbyid",(req,res)=>{
  const id=req.body.id;
  user.findById(personid, function (err, docs) {
    if (err){
        console.log(err);
        
    }
        res.send(docs);
    
  });
})
app.listen(port,()=>{
    console.log("Server running at port 3001");
});