import React, { Component } from "react";
import "../style/hero.scss";
import HeroImage from "../assets/images/hero.png";

export class Hero extends Component {
	render() {
		return (
			<section id="hero" className="page-section">
				<div className="container">
					<div className="row align-items-center">
						<div className="col-lg-5 hero-text">
							<h6>Conținut sintetic generat prin</h6>
							<h2>
								Inteligentă
								<br />
								Artificială
							</h2>
							<p>
								Crează-ți acum propriul conținut generat de un algoritm
								inteligent. Descoperă cu adevarăt cum funcționează inteligența
								artificială.
							</p>
							<a href="#about" className="btn btn-primary">
								AFLĂ MAI MULTE
							</a>
						</div>
						<div className="col-lg-7">
							<img src={HeroImage} id="heroImage" alt="Hero picture" />
						</div>
					</div>
				</div>
			</section>
		);
	}
}

export default Hero;
