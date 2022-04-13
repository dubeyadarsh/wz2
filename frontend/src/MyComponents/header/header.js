import React from 'react'
import logo2 from "../img/logo.png"
import { Link } from 'react-router-dom';
import "./header.css"
 const Header = () => {
    const style={
        fontWeight:"bold",
        color:"#000000"
    }
    return (
        <>
    {/* <nav class="he navbar fw-bold  navbar-expand-lg navbar-light">
  <img class="navbar-brand img-fluid head"  src={logo} href="#" /> */}
  {/* <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon navbar-toggler-danger"></span>
  </button>
 

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
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
     
    </ul> */}
    {/* <form class="form-inline my-2 my-lg-0">
      <button class="btn btn-outline-success  my-sm-0" type="submit">Search</button>
    </form> */}
  {/* </div> */}

{/* </nav> */}

<nav className="navbar navbar-expand-lg navbar-light ml-auto shadow-sm">
					<div className="container">
						<a className="navbar-brand" href="/" title="">
							<img
								src={logo2}
								width="250"
								height="50"
								className="navbar-logo-img"
								alt=""
							/>
						</a>
						<button
							className="navbar-toggler"
							type="button"
							data-bs-toggle="collapse"
							data-bs-target="#navbarNav"
							aria-controls="navbarNav"
							aria-expanded="false"
							aria-label="Toggle navigation"
						>
							<span className="navbar-toggler-icon"></span>
						</button>

						<div className="collapse navbar-collapse" id="navbarNav">
							<ul className="navbar-nav ms-auto me-5 nav-links">
								<li className="ml-auto">
									<a className="nav-link px-3" href="#" title="">
										About
									</a>
								</li >
								<li className="ml-auto">
									<a className="nav-link px-3" href="" title="">
										Log In
									</a>
								</li>
								<li className="ml-auto">
									<a className="nav-link px-3" href="/about-us" title="">
										Sign Up
									</a>
								</li>
							</ul>
						</div>
					</div>
				</nav>

      </>
    )
}
export default Header;