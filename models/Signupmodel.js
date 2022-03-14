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
 project:[{
   _id:{
      type:String,
      unique:true
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
      }],
   requestid: {
      type:String
      }  
   }
]

});
const user=mongoose.model("user",SignupSchema);
module.exports=user;