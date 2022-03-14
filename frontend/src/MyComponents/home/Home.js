import React from 'react';
import {Header1} from '../header1/header1.js';
import Axios from "axios";
import Footer from '../footer/footer.js';
import { useState, useEffect } from 'react';
import './Home.css';
import { Link } from 'react-router-dom';

 const Home = () => {
   
   const [pname, setPname] = useState("");
   const [pdescp, setPdescp] = useState("");
   const [pstatus, setPstatus] = useState("");
   const [sDate, setSdate] = useState(null);
   const [eDate, setEdate] = useState(null);

   const [projects,setprojects]=useState([]);

   useEffect(()=>{
      Axios.get("http://localhost:3001/profile").then((response)=>{
          // console.log(response.data.project);
          setprojects(response.data.project);
      });
       });

   function newProject(){
      document.getElementById("view").style.display="none";
      document.getElementById("newP").style.display="flex";
  }
  function view(){
   document.getElementById("newP").style.display="none";
   document.getElementById("view").style.display="flex";
}

function createProject(e){
   e.preventDefault();
    
         console.log(pstatus+" "+pdescp);
        Axios.post("/newproject",{projectid:pname,sDate:sDate,eDate:eDate,status:pstatus,descp:pdescp}).then((response)=>{
            alert("done");
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
            <button href="#" class="btn btn-lg m-3 w-75 btn-rounded btn-info">
                     Create Task
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
         <div id='view' className='view'>
            <h4 className='mx-auto'>View Projects</h4>
            {
               projects.map((val,key)=>{
                     return <Link to="/Details"  state={{projects:projects,projectid:val._id}} className='btn'>
                        <h1>{val._id} </h1>
                        <h4>{val.status}</h4>
                        </Link>
               })
            }
            
         </div>
      </div>
  </div>
  {/* <Footer /> */}
   </>
};
export default  Home;