import { useEffect } from 'react';
import React from 'react';
import Header from '../header/header.js';
import "./page1.css"
import Footer from '../footer/footer.js';



const Page1 = () => {
  useEffect(()=>{
    setTimeout(()=>rep(),4899)
});
function rep(){
  document.getElementById("hide").style.display="flex";
  document.getElementById("hide2").style.display="flex";
  if(window.screen.width>900){
  var elements =document.getElementsByClassName("hide3");
  for(var i=0; i<elements.length; i++) { 
    elements[i].style.display="flex";
  }
}
}
  return (
    <>
      <Header />
      <div className="main">
        <div className="row def">

            {/***  First Column that contains top rotating circle ****/}
          <div className="col-md-3 col-lg-3 col-sm-12">
            <div className="row lefttopCircle">
              <div className="col">
                <div className="row circlesInLeft"></div>
                <div className="row circlesInLeft bg-light"></div>
                <div className="row circlesInLeft"></div>
              </div>
            </div>
          </div>

          {/*** * 2nd Column that containt content***/}


          <div className="col-lg-6 col-md-6 col-sm-12">
            <div
              class="container text--center intro"
              data-plugin="animateLines"
            >
              <h1>
                Task Management
                <br /> Made Delightfully Simple
              </h1>
              <p class="textp">
                “With WorkZone you will complete projects faster and with less
                overhead”
              </p>
              <p data-animate-lines-ignore="">
                <a href="/login" class="btn btn-lg btn-rounded btn-primary">
                  Signup now, it's FREE!
                </a>
              </p>
            </div>
          </div>

          {/* 3rd Column that contains bottom rotating figure */}
          <div className="col-sm-12 col-lg-3 col-md-3">
            <div className="row rightBottom">
              <div className="col ">
                {/* <div className="circlesInbottom bg-light"></div> */}
                <div className="row circlesInLeft"></div>
                <div className="row circlesInLeft bg-light"></div>
                <div className="row circlesInLeft"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="between">
         <div className="container cn1  w-75 anim ">
         <div className="row ">
           <div className="col-12 mx-2">
             <div className="row">
               <div className="col">
                 <div className="row mt-2 "><strong>WORKZONE</strong></div>
                 <div className="row mt-3 mb-3 ">
                   <div className="col-2 col-lg-1 col-md-1  mt-1 mr-1  "><h7> START </h7></div>
                   <div className=" justify-content-between  smallProg">
                     <div className="progressCircle"></div>
                     <div className="progressCircle"></div>
                     </div>
                     <div id="hide"><h7>  COMPLETED </h7></div>
                 </div>
               </div>
             </div>
             <div className="row mt-3 mb-2">
               <div className="col">
                 <div className="row mt-2 "><strong>OTHER PRODUCTS</strong></div>
                 <div className="row mt-3 mb-3 ">
                   <div className="col-1 mt-1 mr-sm-4 "><h7> START </h7></div>
                   <div className=" justify-content-between  bigProg">
                     <div className="progressCircle"></div>
                     <p class="hide3">Learning how to use product</p>
                     <div className="progressCircle"></div>
                     <p class="hide3">Training Your Staff</p>
                     <div className="progressCircle"></div>
                     <p class="hide3">Micromanaging your task</p>
                     <div className="progressCircle"></div>
                     </div>
                     <div id="hide2"><h7>  COMPLETED </h7></div>
                 </div>
               </div>
             </div>
           </div>
         </div>
         </div>

       <div class="container intro text--center " data-plugin="animateLines">
		    <h2 >Task Management Software That Puts YOU in Control</h2>
        <p class="text--lead pr mt-4 ">“ <strong> WorkZone </strong> is task management software that removes the complexity from project management <br /> and puts you in control. With WorkZone, you and your project team can quickly and easily set up <br /> new projects, assign and share tasks, share a centralized file library and calendar, send and <br /> receive notifications, and synchronize everything across all devices.”</p>
     
	    </div> 
     </div>

      <div className="AboveFooter "> 
      <div class="container text-center intro  text-light" data-plugin="animateLines"> 
      <h1 >Get started today. <br/> Get more done tomorrow.</h1> 
        <p class="text-lead pr text-light">“See everything the team’s doing, and make it easier for them to get important work done, no matter where they are.”</p> 
        <p data-animate-lines-ignore=""> 
      <a href="#" class="mt-5 btn fst-italic btn-lg btn-sq-responsive btn-light">Try for free</a> 
        </p> 
     </div> 
      </div>

      <Footer />

    </>
  );
};
export default Page1;
