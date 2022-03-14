import React from 'react';
import logo from "../img/logo.png"
import './header1.css';
import { useState, useEffect } from 'react';
import Axios from 'axios';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
export const Header1 = () => {
    let navigate=useNavigate();
    const style={
        fontWeight:"bold",
        color:"#000080"
    }
    const [user,setUser]=useState({});
    useEffect(()=>{
        Axios.get("http://localhost:3001/profile").then((response)=>{
          // console.log(response);
        setUser(response.data);
      });
         });

         function logout(e){
            e.preventDefault();
        
            Axios.post("/logout").then((response)=>{
                window.location.reload();
                // navigate("/");
            })
         }
    function back(){
        document.getElementById("containerPr").style.display="none";
    }
    function show(){
        var check=document.getElementById("containerPr").style.display;
        if(check=='flex'){
            document.getElementById("containerPr").style.display="none";
        }else{
            document.getElementById("containerPr").style.display="flex";
        }
        
      }
  return <div>
      <nav class="he navbar fw-bold  navbar-expand-lg navbar-light shadow-sm">
  <img class="navbar-brand img-fluid head"  src={logo} href="#" />
  {/* <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon navbar-toggler-danger"></span>
  </button> */}
 

  {/* <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav ml-auto">
      <li class="nav-item ml-auto  active">
        <a class="nav-link " href="#" style={style}>About <span class="sr-only">(current)</span></a>
      </li>
      <li class="nav-item ml-auto">
        <a class="nav-link" href="#" style={style}>LogIn </a>
      </li>
      <li class="nav-item ml-auto">
        <a class="nav-link" href="#" style={style}>Signup</a>
      </li>
     
    </ul>
    <i class="fa fa-user" aria-hidden="true"></i>
  </div> */}
  <a id='pr' className='user fa-icon d-block text-center' onClick={show}>
    <i class="iconic fa fa-user mt-1 fa-2x"  aria-hidden="true"></i>
  </a>
  <div id='containerPr' class="containerpr">
  <div className='text-center'>
  <div id='pr' className='inneruser fa-icon d-block text-center'>
    <i class="iconic fa fa-user mt-1 fa-2x"  aria-hidden="true"></i>
  </div>
  <div className='m-1'>
      <h6>{user.name}</h6>
  </div>
  <div className='m-1'>
    <h6>{user.username}</h6>
  </div>
  <div className='row'>
    <div className='col-lg-6 col-sm-12'>
        <button className="btn br btn-danger m-1 button" onClick={logout}>Logout</button>
    </div>
    <div className='col-lg-6  col-sm-12'>
        <button className="btn br btn-primary m-1 button" onClick={back}>Back</button>
    </div>
  </div>
  </div>
  </div>

</nav>
  </div>;
};
