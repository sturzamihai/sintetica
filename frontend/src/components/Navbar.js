import React from "react";
import Logo from "../assets/images/logo.png";
import { Link } from "react-router-dom";

const Navbar = () => {
	return (
		<nav className="navbar navbar-expand-lg">
			<div className="container">
				<Link to="/" className="navbar-brand">
					<img src={Logo} height="40" alt="Sintetica Logo" />
				</Link>
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
						<a className="nav-link" href="/#algorithms">
							ALGORITMI
						</a>
						<a className="nav-link active" href="/#about">
							DESPRE
						</a>
						<a
							className="nav-link"
							href="https://github.com/sturzamihai/sintetica"
							target="__blank"
						>
							GITHUB
						</a>
						<a href="/incearca" className="nav-link cta-link">
							ÎNCEARCĂ
						</a>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
