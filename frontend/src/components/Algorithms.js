import React, { Component } from "react";
import "../style/algo.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faHeart,
	faLaugh,
	faFileAlt,
	faEye,
	faCommentDots
} from "@fortawesome/free-regular-svg-icons";

export class Algorithms extends Component {
	render() {
		return (
			<section id="algorithms" className="page-section">
				<div className="container">
					<div className="row">
						<div className="col-lg-12">
							<div className="info-header">
								<h2>Algoritmi</h2>
								<span id="longSeparator"></span>
								<span id="shortSeparator"></span>
							</div>
						</div>
					</div>
					<div className="row text-center">
						<div className="col-lg-4 algo-parent">
							<FontAwesomeIcon icon={faLaugh} size="4x" className="algo-icon"/>
							<h5>Progressive Growing of GANs</h5>
							<p>Generarea de chipuri umane prin renumitul algoritm creat de nVidia.</p>
						</div>
						<div className="col-lg-4 algo-parent">
							<FontAwesomeIcon icon={faFileAlt} size="4x" className="algo-icon"/>
							<h5>GPT-3</h5>
							<p>Generarea de text in functie de o fraza cheie prin algoritmii OpenAI.</p>
						</div>
						<div className="col-lg-4 algo-parent">
							<FontAwesomeIcon icon={faEye} size="4x" className="algo-icon"/>
							<h5>Image deblur</h5>
							<p>Sporirea claritatii unei imagini printr-un Autoencoder.</p>
						</div>
					</div>
					<div className="row text-center">
						<div className="col-lg-4 offset-lg-2 algo-parent">
							<FontAwesomeIcon icon={faHeart} size="4x" className="algo-icon"/>
							<h5>Analiza de sentiment</h5>
							<p>Analiza de text din care rezulta sentimentul si subiectivitatea datelor de intrare.</p>
							<span className="badge bonus-badge">Bonus</span>
						</div>
						<div className="col-lg-4 algo-parent">
							<FontAwesomeIcon icon={faCommentDots} size="4x" className="algo-icon"/>
							<h5>Perceptia brandului</h5>
							<p>Generarea unor indici cheie referitoare la perceptia unui brand.</p>
							<span className="badge bonus-badge">Bonus</span>
						</div>
					</div>
				</div>
			</section>
		);
	}
}

export default Algorithms;
