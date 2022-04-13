import React from 'react'
import { useLocation } from "react-router-dom";
import Axios from "axios";
import {Header1} from '../header1/header1.js';

import { useState, useEffect } from 'react';
const Details = () => {


  const location = useLocation();
   const props = location.state;
   const [allusers,setAllUser]=useState([]);
   const [tname,settname]=useState("");
   const [tperson,settperson]=useState("");

 
   const [tpersons ,settpersons]=useState([]);

 function fetchPersons(e){
  e.preventDefault();

  Axios.get("http://localhost:3001/profile").then((response)=>{
    // console.log(response.data.project);
    
     for(var i=0;i<response.data.project.length;i++){
      
    if(response.data.project[i]._id===props.projectid){
  
      settpersons(response.data.project[i].sentRequest)
      console.log(response.data.project[i])
      break;
    }
  
   }
});
  
 }
   function fetchAll(e){
    e.preventDefault();
  Axios.get("/fetchAll").then((res)=>{
   console.log(res.data);
   console.log(props.projects)
   setAllUser(res.data);
  })
   }
   function sentRequest(friendid,friendname){
    console.log(friendname);

    Axios.post("/sentReq",{friendid:friendid,friendname:friendname, projectid:props.projectid,sdate:props.sdate,edate:props.edate}).then((response)=>{
        alert("sent");
    })
 }
 function addTask(e){
  e.preventDefault();
console.log(tperson);

  console.log(tname,tperson.id,props.sdate,props.edate,"these arre details");
  Axios.post("/addTask",{tname:tname,tperson:tperson, pid:props.projectid,sdate:props.sdate,edate:props.edate}).then((res)=>{
    alert("task added succesfullly");
  })
 }
  return (<>
    < Header1 />
    
    <h1>{props.projectid}</h1>
    <button onClick={fetchAll}>Add Mates</button>
    <div className="container">
      {allusers.map((val,key)=>{
        return <>
        <div className='row   w-50 my-2' style={{border:"2px solid green"}}>
          <div className="col-1">
          <i class="iconic fa fa-user mt-1 fa-2x"  aria-hidden="true"></i>

          </div>
          <div className="col-4">
         <h6>{val.name}</h6>
         <h6>{val.username}</h6>
         </div>
         <div className="col-1 mt-1 ml-5">
           <button key={key} className='btn btn-primary' onClick={()=>{sentRequest(val._id,val.name)}}>Send</button>

         </div>
         
         </div>
        </>
      })
    }
    </div>
    <h4>Assign task</h4>
    <div className="container">
    <div class="form-group row">
                           <label >Task</label>
                           <input className='w-75' value={tname}  onChange={(e)=>settname(e.target.value)} type="text" class="form-control" placeholder="Enter task Name" />
      </div>
      <div class="form-group">
                           <label for="exampleInputPassword1">Assigned To</label>
                           <select value={tperson}  onChange={(e)=>settperson(e.target.value)} onClick={fetchPersons} class="form-select form-control" aria-label="Default select example">
                              <option selected value="" disabled>--Select person--</option>
                             {
                               tpersons.map((val,key)=>{
                             return  <option  value={val._id}>{val.username}</option>
                               })
                             }
                              {/* <option value="Pending">Pending</option>
                              <option value="Done">Done</option> */}
                           </select>
       </div>
       <div class="form-group row">
                          <button onClick={addTask} className='btn btn-success'> Submit</button>
      </div>
    </div>
  
    </>
  )
}
export default  Details;