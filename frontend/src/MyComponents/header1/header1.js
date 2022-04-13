import React from 'react';
import logo from "../img/logo.png"
import './header1.css';
import { useState, useEffect } from 'react';
import Axios from 'axios';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {FaPaperPlane } from 'react-icons/fa';
import {FaCheck } from 'react-icons/fa';
import {FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
export const Header1 = () => {
    let navigate=useNavigate();
    const style={
        fontWeight:"bold",
        color:"#000080"
    }
    const [user,setUser]=useState({});
    const [requests,setrequests]=useState([]);
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
          document.getElementById("containerReq").style.display="none";
            document.getElementById("containerPr").style.display="flex";
        }
        
      }
      function showRequest(){
        Axios.get("http://localhost:3001/profile").then((response)=>{
          // console.log(response);
        
        setrequests(response.data.requests);
      });
        var check=document.getElementById("containerReq").style.display;
        if(check=='flex'){
            document.getElementById("containerReq").style.display="none";
        }else{
            document.getElementById("containerReq").style.display="flex";
        }
        
      }
      function  Accept(projectid,fid){
        console.log(projectid+" "+fid)
    
        Axios.post("/acceptRequest",{projectid:projectid,friendid:fid}).then((response)=>{
            alert("Accepted");
        })
     }
     function  Remove(projectid,fid){
      console.log(projectid+" "+fid)
  
      Axios.post("/removeRequest",{projectid:projectid,friendid:fid}).then((response)=>{
          alert("removed");
      })
   }
  return <div>
      <nav class="he navbar fw-bold  navbar-expand-lg navbar-light shadow-sm">
  <Link to="/">
  <img class="navbar-brand img-fluid head"  src={logo} href="#" /></Link>
  <div className="msgboxUser">
  <a id='pr' className='user fa-icon d-block text-center mx-1' onClick={showRequest}>
      <FaPaperPlane className='h-50 w-50  mt-2 mr-1' />
   </a>
  <a id='pr' className='user fa-icon d-block text-center' onClick={show}>
    <i class="iconic fa fa-user mt-1 fa-2x"  aria-hidden="true"></i>
  </a>
  </div>
  
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
  <div id='containerReq' class="row containerReq" style={{overflowY: "scroll", height:"400px"}}>
  <div className="col-12">
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos accusantium nam incidunt quaerat recusandae delectus quae consequatur, at suscipit repellat corrupti voluptate dolorem explicabo quod reprehenderit tenetur pariatur possimus est fuga minus odit error molestias ducimus! Error mollitia accusamus explicabo animi consequatur quaerat neque exercitationem deserunt, architecto cumque aut quos, excepturi minus suscipit vel! Natus error tempore temporibus nulla quaerat doloribus accusantium nobis dicta odio adipisci deserunt, laborum fugiat. Beatae, similique temporibus! Eos amet sed, praesentium qui provident eveniet quam suscipit odio animi consectetur ex ducimus aperiam est magni deleniti, voluptatibus quos consequuntur tempora iusto earum placeat iste libero commodi?</p>
  {
        
        requests.map((val,key)=>{
          return<>
          <div className="row pt-2 pl-2 ">
          <h4> {val.projectid}  </h4>
          <button className='btn btnReq btn-success ml-5'  onClick={()=>{Accept(val.projectid,val._id)}}><FaCheck /></button> 
           <button className='btn btnReq btn-danger' onClick={()=>{Remove(val.projectid,val._id)}}><FaTimes /> </button>
          </div>
          <hr style={{color:"black"}}/>
          </>
         })
      }
        </div>
  </div>
</nav>
  </div>;
};
