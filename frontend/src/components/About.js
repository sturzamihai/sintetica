import React, { Component } from "react";
import "../style/about.scss";
import Profile from "../assets/images/profile.png";

export class About extends Component {
	render() {
		return (
			<section id="about" className="page-section">
				<div className="container">
					<div className="row align-items-center">
					<div className="col-lg-6">
							<img className="about-image" src={Profile} />
						</div>
						<div className="col-lg-6">
							<div className="info-header">
								<h2>Despre</h2>
								<span id="longSeparator"></span>
								<span id="shortSeparator"></span>
							</div>
							<p>
								Mă numesc Mihai-George Sturza. Sunt un tânăr de 18 ani pasionat
								de tehnologie și de anteprenoriat. <br />
								<br />
								De când eram mic am fost fascinat de lumea calculatoarelor,
								atracție care a devenit una dintre cele mai mari pasiuni ale
								mele. Încă de la cele mai fragede vârste, am învățat să
								programez cu ajutorul resurselor online, încercând să-mi
								transform pasiunea într-o ocupație.
								<br />
								<br />
								În scurt timp, am ajuns să creez una dintre cele mai mari
								comunități de inteligență artificială din România și să imi
								incep propria afacere în domeniul IT, toate acestea cât timp
								incercam să cuceresc America alături de echipa mea la
								prestigiosul concurs de Computer Science - ACSL. <br />
								<br />
							</p>
						</div>
					</div>
				</div>
			</section>
		);
	}
}

export default About;
