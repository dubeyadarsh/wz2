const mongoose=require("mongoose");
const SignupSchema=new mongoose.Schema({
   _id:{
      type:String,
   },
 username:{
    type:String,
    required:true
 },
 name:{
    type:String,
    required:true
 },
 password:{
    type:String,
    required:true
 },
 requests:[
{
   _id:{
      type:String,
     
   },
   username:{
      type:String
   },
   projectid:{
      type:String
   },
   descp:{
      type:String
   },
   sdate:{
      type:String
   },
   edate:{
      type:String
   }
}
 ],
 tasks:[
   {taskname:{type:String},sdate:{type:Date},
   edate:{type:Date},
   project:{type:String},
   userid:{type:String},
   username:{type:String},
   status:{type:String},
   tdescp:{type:String}
}
   
 ],
project:[{
   _id:{
      type:String,
      // unique:true
   },
   admin:{
      type:Boolean,
   },
   status:{
      type:String
   },
   sdate:{
      type:Date
   },
   edate:{
      type:Date
   },
   description:{
      type:String
   },
 
   sentRequest:[{
      _id:{type: String},
      username: {type: String}
   
   },
],
requestid:{
   type:String
},
tasks:[{
   taskname:{type:String},
   sdate:{type:Date},
   edate:{type:Date},
   status:{type:String},
   tdescp:{type:String},
   assignTo:{name:{type:String},id:{type:String}}
  }]
   }],

});
const user=mongoose.model("user",SignupSchema);
module.exports=user;