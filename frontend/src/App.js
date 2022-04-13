import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from "react";
import Axios from "axios";
import Page1  from './MyComponents/page1/page1';
import {Login}  from './MyComponents/login/login'; 
import { BrowserRouter as Router,Routes ,Route} from "react-router-dom";
import Home  from './MyComponents/home/Home'; 
import Details  from './MyComponents/home/Details'; 
function App() {
  const [isAuth, setisAuth] = useState(false);
  useEffect(() => {
   Axios.get("/isAuthenticated").then((response)=>{
     console.log(response.data);
     setisAuth(response.data);
   })
  
  });

  return (
    <Router>
			<Routes>
        {isAuth?
          <Route exact path="/" element={<Home />} />:
          <Route exact path="/" element={<Page1 />} />
        }
          {/* <Route exact path="/" element={isAuth?<Home />:<Page1 />} /> */}
          <Route path="/login" element={<Login />} />
          {/* <Route path="/home" element={<Home />} /> */}
          <Route path="/Details" element={<Details />} />

		 	</Routes>
		 </Router>
  );
}

export default App;
