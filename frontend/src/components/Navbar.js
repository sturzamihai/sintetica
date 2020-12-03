import React, { Component } from "react";
import "../style/navbar.scss";
import Logo from "../assets/images/logo.png";

export class Navbar extends Component {
	render() {
		return (
			<nav className="navbar navbar-expand-lg">
				<div className="container">
					<a href="/" className="navbar-brand">
						<img src={Logo} height="40" alt="Sintetica Logo" />
					</a>
					<button
						className="navbar-toggler custom-toggler"
						type="button"
						data-toggle="collapse"
						data-target="#mainNavbar"
						aria-controls="mainNavbar"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span className="navbar-toggler-icon"></span>
					</button>
					<div
						className="collapse navbar-collapse justify-content-end"
						id="mainNavbar"
					>
						<div className="navbar-nav">
							<a className="nav-link" href="#">
								ALGORITMI
							</a>
							<a className="nav-link active" href="#">
								DESPRE
							</a>
							<a className="nav-link" href="#">
								GITHUB
							</a>
							<a className="nav-link cta-link" href="#">
								ÎNCEARCĂ
							</a>
						</div>
					</div>
				</div>
			</nav>
		);
	}
}

export default Navbar;
