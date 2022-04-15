import logo2 from "../img/logo.png"
import React from 'react';
import { useState, useEffect } from 'react';
import {Navigate} from 'react-router-dom';
import Axios from "axios";
import './login.css';
import { useNavigate } from 'react-router-dom';



export const Login = () => {

    // Variable defined
    // Signup department
    
    const navigate = useNavigate();
    const [registerName, setregisterName] = useState("");
    const [registerMail, setregisterMail] = useState("");
    const [registerPass, setregisterPass] = useState("");




    // Login deparment
    const [loginMail, setloginMail] = useState("");
    const [loginPass, setloginPass] = useState("");
    
    useEffect(()=>{
        login();
    });
    function login(){
        const signUpButton = document.getElementById('signUp');
        const signInButton = document.getElementById('signIn');
        const container = document.getElementById('container1');

        signUpButton.addEventListener('click', () => {
	        container.classList.add("right-panel-active");
        });

        signInButton.addEventListener('click', () => {
	        container.classList.remove("right-panel-active");
        });
    }

    function register(e){
        e.preventDefault();
        console.log(registerName+" "+registerMail+" "+registerPass);
        Axios.post("/register",{registerName:registerName,registerMail:registerMail,registerPass:registerPass});

        alert("Successfully Registered.. Now login !")
    }

    function Signin(e){
        e.preventDefault();
        console.log(loginMail+" "+loginPass);
        Axios.post("/login",{username:loginMail,password:loginPass}).then((response)=>{
          if(response.data.isAuthenticated){
          
            
            alert("U logged in succesfully");
            // setTimeout(()=>window.location='http://localhost:3000/',10000);
            window.location='http://localhost:3000/'

          }
          else{
            alert("Wrong login credentials ..try again ")
          }
        
        });
        }

        function Glogin(e){
            e.preventDefault();
            console.log("U clicked it")
            window.open("http://localhost:3001/auth/google","_self");
          }

  return <div className="body1">
      <img class="img1"  src={logo2} href="#" />
        <div class="container1" id="container1">
            <div class="form-container sign-up-container">
                <form className="formL" action="#">
                    <h1>Create Account</h1>
                    <div class="social-container">
                        {/* <a href="#" class="social"><i class="fab fa-facebook-f"></i></a> */}
                        <a href="#" class="social" onClick={Glogin}><i class="fab fa-google-plus-g"></i></a>
                        {/* <a href="#" class="social"><i class="fab fa-linkedin-in"></i></a> */}
                    </div>
                    <span>or use your email for registration</span>
                    <input value={registerName}  onChange={(e)=>setregisterName(e.target.value)} type="text" placeholder="Name" />
                    <input  value={registerMail}  onChange={(e)=>setregisterMail(e.target.value)} type="email" placeholder="Email" />
                    <input value={registerPass}  onChange={(e)=>setregisterPass(e.target.value)} type="password" placeholder="Password" />
                    <button onClick={register}>Sign Up</button>
                </form>
            </div>
	        <div class="form-container sign-in-container">
		        <form className="formL" action="#">
			        <h1 className="fr">Sign in</h1>
			        <div class="social-container">
				        {/* <a href="#" class="social"><i class="fab fa-facebook-f"></i></a> */}
				        <a href="#" class="social" onClick={Glogin} ><i class="fab fa-google-plus-g"></i></a>
				        {/* <a href="#" class="social"><i class="fab fa-linkedin-in"></i></a> */}
			        </div>
			        <span>or use your account</span>
			        <input value={loginMail}  onChange={(e)=>setloginMail(e.target.value)} type="email" placeholder="Email" required />
                    <input value={loginPass}  onChange={(e)=>setloginPass(e.target.value)} type="password" placeholder="Password" required />
			        <a href="#">Forgot your password?</a>
			        <button onClick={Signin}>Sign In</button>
		        </form>
	        </div>
	        <div class="overlay-container">
		        <div class="overlay">
			        <div class="overlay-panel overlay-left">
				        <h1 className="fs">Welcome Back!</h1>
				        <p>To keep connected with us please login with your personal info</p>
				        <button class="ghost" id="signIn">Sign In</button>
			        </div>
			        <div class="overlay-panel overlay-right">
				        <h1>Hello, Friend!</h1>
				        <p>Enter your personal details and start journey with us</p>
				        <button class="ghost" id="signUp">Sign Up</button>
			        </div>
		        </div>
	        </div>
        </div>
    </div>;
};
