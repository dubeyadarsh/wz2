import React from 'react';
import {Header1} from '../header1/header1.js';
import Axios from "axios";
import Footer from '../footer/footer.js';
import { useState, useEffect } from 'react';
import './Home.css';
import { Link } from 'react-router-dom';
import {FaCheck } from 'react-icons/fa';
 const Home = () => {
   
   const [pname, setPname] = useState("");
   const [pdescp, setPdescp] = useState("");
   const [pstatus, setPstatus] = useState("");
   const [sDate, setSdate] = useState(null);
   const [eDate, setEdate] = useState(null);

   const [projects,setprojects]=useState([]);
   const [tasks,settasks]=useState([]);

   useEffect(()=>{
      Axios.get("http://localhost:3001/profile").then((response)=>{
          // console.log(response.data.project);
          setprojects(response.data.project);
         
      });
       });

   function newProject(){
      document.getElementById("view").style.display="none";
      document.getElementById("newP").style.display="flex";
      document.getElementById("viewTask").style.display="none";
      
  }
  function view(){
     
   document.getElementById("newP").style.display="none";
   document.getElementById("view").style.display="flex";
   document.getElementById("viewTask").style.display="none";
}
function viewTask(){
   document.getElementById("newP").style.display="none";
   document.getElementById("view").style.display="none";
   document.getElementById("viewTask").style.display="flex";
   Axios.get("http://localhost:3001/profile").then((response)=>{
      settasks(response.data.tasks);
  });
 
}

function createProject(e){
   e.preventDefault();
    
         console.log(pstatus+" "+pdescp);
        Axios.post("/newproject",{projectid:pname,sDate:sDate,eDate:eDate,status:pstatus,descp:pdescp}).then((response)=>{
            alert("done");
        })
        alert("Project Added Successfully !!");
        window.location.reload();
}
function TaskSuccess(id,project,taskid){
        console.log("tasl",id,project,taskid);
        Axios.post("/successTask",{project:project,id:id,taskid:taskid}).then((response)=>{
            alert("Task successfully done !");
        })
}
  return<>
  < Header1 />
  
   <div className='row height mt-1'>
      <div className='col-lg-3 cl text-center   col-sm-12'>
         <div className='gt'>
            <button href="#" onClick={newProject} class="btn btn-lg m-3 w-75 btn-rounded btn-info">
                     Create Project
            </button>
            <button href="#" onClick={view} class="btn btn-lg m-3 w-75 btn-rounded btn-info">
                     View Project
            </button>
            <button href="#"  onClick={viewTask}  class="btn btn-lg m-3 w-75 btn-rounded btn-info">
                     View Task
            </button>
         </div>
      </div>
      <div className='col-lg-9 c2 col-sm-12'>
         <div id='newP' className='row newP'>
                  <div className='col-12 text-center'>
                     <h4 className='mt-3'>Create New Project</h4>
                  </div>
                  <div className='col-12'>
                     <form>
                        <div class="form-group">
                           <label >Project Name</label>
                           <input value={pname}  onChange={(e)=>setPname(e.target.value)} type="text" class="form-control" placeholder="Enter Project Name" />
                        </div>
                        <div class="form-group">
                           <label for="exampleInputPassword1">Project Status</label>
                           <select value={pstatus}  onChange={(e)=>setPstatus(e.target.value)} class="form-select form-control" aria-label="Default select example">
                              <option selected value="" disabled>--Select status--</option>
                              <option value="Pending">Pending</option>
                              <option value="Done">Done</option>
                           </select>
                        </div>
                        <div className='row'>
                           <div class="form-group col-lg-6 col-sm-12">
                              <label for="birthday">Start Date:</label>
                              <input value={sDate}  onChange={(e)=>setSdate(e.target.value)} type="date" id="birthday" name="birthday"/>
                           </div>
                           <div class="form-group col-lg-6 col-sm-12">
                              <label for="birthday">Due Date:</label>
                              <input value={eDate}  onChange={(e)=>setEdate(e.target.value)} type="date" id="birthday" name="birthday"/>
                           </div>
                        </div>
                        <div class="form-group">
                           <i class="fas fa-pencil-alt prefix"></i>
                           <label > Description</label>
                           <textarea value={pdescp}  onChange={(e)=>setPdescp(e.target.value)} id="form10" class="md-textarea form-control" rows="3"></textarea>
                        </div>
                        <button type="submit" onClick={createProject} class="btn btn-warning">Submit</button>
                     </form>
                  </div>
         </div>
         <div id='view' className='vie'>
         <div className="row w-100">
            {
               projects.map((val,key)=>{
                  
                     return(
                     <div className='col-md-5  col-12 projectBox'>
                     
                        <h6>{val._id}</h6>
                        <h10>{val.description}</h10>
                        <div>
                        <span> From <i className='mr-2'>{val.sdate==null?"":val.sdate.split("T")[0]} </i>  To  <i className='text-danger'> {val.edate==null?"":val.edate.split("T")[0]}</i> </span>

                        </div>
                        <div  style={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
                        {/* <Link to="#" className='btn btn-danger'  > X </Link> */}
                        {val.admin?<Link to="/Details" state={{teamMember:val.sentRequest,tasks:val.tasks,projectid:val._id,sdate:val.sdate,edate:val.edate,descp:val.description}}  className='btn btn-success'  > view </Link>:<div></div>}

                        </div>

                     </div>
                     
                   
                     
               )})
               
            }
           </div>
         </div>
         <div id='viewTask' className='viewTask'>
         <div className="row w-100">
            <div className="col">
            {
               tasks.map((val,key)=>{
                return (
                   <div className="container bg-light ml-3 mt-1">
                      <h2 className="text-center">{val.project}</h2>
                    <div className="row ">
                   <div className="col-8">
                  <div><h6><strong> Task Name: </strong> <i> {val.taskname} </i></h6> </div>
                  <div><h6><strong> Description: </strong> <i>{val.tdescp==null?"Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, maiores.":val.tdescp}</i>
                  </h6> </div>
                  

                  </div>  


                  <div className="col-4">
                     <h6> <strong> Status : </strong> {val.status==null? <i className='text-danger'> "Pending" </i> :<i className='text-success'> "Finished" </i>}</h6>
                     <div><strong> From </strong> <i className='mr-2'>{val.sdate==null?"":val.sdate.split("T")[0]} </i></div>
                     <div> <strong>  To </strong>  <i className='text-danger'> {val.edate==null?"":val.edate.split("T")[0]}</i> </div>
                     <div className="btn btn-success mx-5 mt-2 mb-1 w-50" onClick={()=>{TaskSuccess(val.userid,val.project,val._id)}}><FaCheck /></div>
                  </div>
                  
                  </div>
               </div>
                
               );
               })
            }
            </div>
           </div>
         </div>
      </div>
  </div>
  {/* <Footer /> */}
   </>
};
export default  Home;