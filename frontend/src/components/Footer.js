import React from "react";
import Logo from "../assets/images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faFacebook,
	faInstagram,
	faLinkedin,
	faGithub,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
	return (
		<footer id="footer">
			<div className="container">
				<div className="row align-items-center">
					<div className="col-lg-6 text-center text-lg-left">
						<img src={Logo} height="50" />
					</div>
					<div className="col-lg-6 text-center text-lg-right">
						<a href="#" className="btn github-link">
							ÎNCEARCĂ
						</a>
					</div>
				</div>
				<hr />
				<div className="row">
					<div className="col-lg-6 text-center text-lg-left">
						<p>Creat cu 💜 de Mihai-George Sturza. </p>
					</div>
					<div className="col-lg-6 text-center text-lg-right ">
						<a href="https://www.facebook.com/mihaigeorge.sturza/">
							<FontAwesomeIcon icon={faFacebook} className="social-icon" />
						</a>
						<a href="https://www.instagram.com/mihai.sturza/">
							<FontAwesomeIcon icon={faInstagram} className="social-icon" />
						</a>
						<a href="https://www.linkedin.com/in/mihai-george-sturza-53a801172/">
							<FontAwesomeIcon icon={faLinkedin} className="social-icon" />
						</a>
						<a href="https://github.com/sturzamihai">
							<FontAwesomeIcon icon={faGithub} className="social-icon" />
						</a>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
