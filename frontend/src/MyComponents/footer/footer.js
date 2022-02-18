import "./footer.css";
import logo from "../img/logo.png"

 function Footer() {
	return (
		<footer>
			<div className="container">
				<div className="row">
					<div className="col-md-8 mb-4">
						<img
							src={logo}
							alt="WorkZone"
							height="70"
							width="300"
						/>
					</div>

					<div className="col-md-4">
						<h4 className="text-light">Follow Us</h4>
						<div className="d-flex">
							<a
								href="https://m.facebook.com/shahid.siddiqui.1806253"
								className="social-round-icon rounded-circle fa-icon d-block align-center"
								title=""
							>
								<i
									className="fab fa-facebook-f w-100 align-bottom text-center"
									aria-hidden="true"
								></i>
							</a>
							
							<a
								href="https://www.linkedin.com/in/suyash-shingte-1b69671ab"
								className="social-round-icon rounded-circle fa-icon d-block"
								title=""
							>
								<i
									className="fab fa-linkedin-in w-100 align-bottom text-center"
									aria-hidden="true"
								></i>
							</a>

							<a
								href="https://twitter.com/_adarsh_dubey?t=m-iADINO6lPOoJXxO-W10g&s=08"
								className="social-round-icon rounded-circle fa-icon d-block"
								title=""
							>
								<i
									className="fab fa-twitter w-100 align-bottom text-center"
									aria-hidden="true"
								></i>
							</a>

							<a
								href="https://www.instagram.com/_adarsh.dubey/"
								className="social-round-icon rounded-circle fa-icon d-block"
								title=""
							>
								<i
									className="fab fa-instagram w-100 align-bottom text-center"
									aria-hidden="true"
								></i>
							</a>

						</div>
						<p style={{ marginTop: "1em", color: "white" }}>
							<small>© WorkZone 2022</small>
						</p>
					</div>
				</div>
			</div>
		</footer>
	);
}
export default  Footer;