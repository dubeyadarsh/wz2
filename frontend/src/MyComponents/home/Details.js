import React from 'react'
import { useLocation } from "react-router-dom";
import Axios from "axios";
import {Header1} from '../header1/header1.js';
import { PieChart } from 'react-minimal-pie-chart';
import { useState, useEffect } from 'react';
import './Details.css';
import avatar from "../img/avatar.jpg"
const Details = () => {


  const location = useLocation();
   const props = location.state;
   const [allusers,setAllUser]=useState([]);
   const [tname,settname]=useState("");
   const [tdescp,settdescp]=useState("");
   const [tperson,settperson]=useState("");
   const [length,setlength]=useState(0);
   const [done,setdone]=useState(0);
   const [per,setper]=useState("");
   const [tpersons ,settpersons]=useState([]);
   const [tasks ,settasks]=useState([]);
  
   
useEffect(()=>{
   
       pie();
       settpersons(props.teamMember)
       settasks(props.tasks)
       
});
function pie(){
      console.log(props.tasks);
      setlength(props.tasks.length);
      var c=0;
     for(var i=0;i<props.tasks.length;i++){
      
      
       if(props.tasks[i].status==="finished") c++;
     }
     
     setper(((c*100)/props.tasks.length).toFixed(0)+"%");
     setdone(c);
}

 function openTaskbox(e){
  e.preventDefault();
  document.getElementById("wrapper").style.display="flex";
  // document.style.filter="blur(2px)";
  
 }
 function closeTaskbox(e){
  e.preventDefault();
  document.getElementById("wrapper").style.display="none";
 }
   function fetchAll(e){
    e.preventDefault();
  Axios.get("/fetchAll").then((res)=>{
   console.log(res.data);
   console.log(props.tasks)
   setAllUser(res.data);
  })
   }
   function sentRequest(friendid,friendname){
    console.log(friendname,props.descp,props.sdate);

    Axios.post("/sentReq",{friendid:friendid,friendname:friendname, projectid:props.projectid,sdate:props.sdate,edate:props.edate,descp:props.descp}).then((response)=>{
        alert("sent");
    })
 }
 function addTask(e){
  e.preventDefault();
  const personid=tperson.split(",")[0];
  const pname=tperson.split(",")[1];


  Axios.post("/addTask",{tname:tname,tdescp:tdescp,tperson:personid, pname:pname,pid:props.projectid,sdate:props.sdate,edate:props.edate}).then((res)=>{
    alert("task added succesfullly");
  })
  document.getElementById("wrapper").style.display="none";
 }
 function getName(id){
   
   Axios.post("/findbyid",{id:id}).then((res)=>{
     console.log(res.data);
    // setpname(res.data);
    return res.data;
   })
  
 }
  return (<>
    < Header1 />
    <div className="row m-auto px-4 py-2">
      <div className="col-6 pdesc p-2">
      <h1>{props.projectid}</h1>
      <h4 className='my-2'>{props.descp}</h4>
      <h5> From <i className='mr-2'>{props.sdate==null?"":props.sdate.split("T")[0]} </i>  To  <i className='text-danger'> {props.edate==null?"":props.edate.split("T")[0]}</i> </h5>
      </div>
      
      <div className="col-6 piedesc">
  <div className="row">
    <div className="col-5">
    <PieChart  style={{height:"200px",width:"200px",marginLeft:"10px"}} radius={48} lineWidth={10} center={[50,50]}
  totalValue={length} background={'rgb(225,225,225)'} labelPosition={50}
  animation
  animationDuration={500}
   animationEasing="ease-out"
   paddingAngle={0}
   
  label={(props) => { return props.dataEntry.title;}}
  data={[
    { title: per, value:done, color: 'rgb(0,175,155)' },
    
   
  ]}
/>
    </div>
   <div className="col-6 my-auto">
    <div className="row">
    <div className='my-1' style={{height:"20px",width:"20px",borderRadius:"50%",backgroundColor:"rgb(0,175,155)"}}></div>
    <h4 className='ml-1'>Task Completed</h4>
    </div>
    <div className="row">
    <div className='my-1' style={{height:"20px",width:"20px",borderRadius:"50%",backgroundColor:"rgb(225,225,225)"}}></div>
    <h4  className='ml-1'>Task Remaining</h4>
    </div>
     </div>  

</div>
      </div>
   
    </div>
    
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
           <button key={key} className='btn btn-primary' onClick={()=>{sentRequest(val._id,val.username)}}>Send</button>

         </div>
         
         </div>
        </>
      })
    }
    </div>
    <h4>Assign task</h4>
    <div id="wrapper">
    <div id="taskbox" className="container">
    <div class="form-group ">
                           <label >Task</label>
                           <input className='w-75' value={tname}  onChange={(e)=>settname(e.target.value)} type="text" class="form-control" placeholder="Enter task Name" />
      </div>
      <div class="form-group ">
                           <label >Task Description</label>
                           <textarea className='w-75' value={tdescp}  onChange={(e)=>settdescp(e.target.value)} type="text" class="form-control" placeholder="Enter task Name" > </textarea>
      </div>
      <div class="form-group">
                           <label for="exampleInputPassword1">Assigned To</label>
                           <select value={tperson}  onChange={(e)=>settperson(e.target.value)}  class="form-select form-control" aria-label="Default select example">
                              <option selected value="" disabled>--Select person--</option>
                             {
                               tpersons.map((val,key)=>{
                             return  <option  value={val._id+","+val.username}>{val.username}</option>
                               })
                             }
                              {/* <option value="Pending">Pending</option>
                              <option value="Done">Done</option> */}
                           </select>
       </div>
       <div class="form-group row justify-content-between">
       <button onClick={closeTaskbox} className='btn btn-danger'> Close</button>

                          <button onClick={addTask} className='btn btn-success'> Submit</button>

      </div>
     
    </div>
    </div>
    <div className="row m-auto px-4 py-2">
      <div className="col-4 pdesc p-2">
      <div className="p-2 " style={{borderBottom:"1px solid  gray"}}>
            <h4>Team Member's :</h4>
       </div>
       <div className="p-2" style={{display:"flex", flexDirection:"row"}}>
         
          {
                               tpersons.map((val,key)=>{
                             return  <div>
                             
                             <div className="m-1"  >
                             <img src={avatar} alt="Avatar" class="avatar" />
                             {val.username}
                             </div>
                             
                             </div>
                               })
          }
            
        
        </div>
      </div>
      <div className="col-8 pdesc p-2">
      <div className="p-2 row justify-content-between mx-1 " style={{borderBottom:"1px solid  gray"
}}>
        <div className="col-4">
        <h4>Task List:</h4>
        </div>
         <div className="col-2" >
         <button onClick={openTaskbox} className='btn btn-primary' style={{width:"125px"}}>New task</button>
         </div>
       </div>
       <div className="row mx-1 p-2" style={{borderBottom:"1px solid  gray"}} >
      <div className="col-1"><strong>#</strong></div>
      <div className="col-2"><strong> Task </strong></div>
      <div className="col-3"><strong> Assigned to </strong></div>
      <div className="col-4"><strong> Description </strong></div>
      <div className="col-2"><strong> status </strong></div>
     
       </div>
       {
          tasks.map((val,key)=>{
            return  <div className="row mx-1 p-2" style={{borderBottom:"1px solid  gray"}} >
            <div className="col-1">{key}</div>
            <div className="col-2">{val.taskname}  </div>
            <div className="col-3"> {val.assignTo.name} </div>
            <div className="col-4"> {val.tdescp} </div>
            <div className="col-2"> {val.status==""?<i className='text-danger'> "Pending" </i> :<i className='text-success'> "Finished" </i>}</div>
           
             </div>
              })
       }
      </div>
      
   
    </div>
   
    </>
  )
}
export default  Details;