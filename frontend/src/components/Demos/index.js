import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faHeart,
	faLaugh,
	faFileAlt,
	faEye,
	faCommentDots,
} from "@fortawesome/free-regular-svg-icons";

import pgg from "../../assets/images/bg-pgg.png";

const Selector = () => {
	return (
		<section className="page-section">
			<div className="container">
				<div className="row">
					<div className="col-lg-12">
						<div className="info-header">
							<h2>Selectează un demo</h2>
							<span id="longSeparator"></span>
							<span id="shortSeparator"></span>
						</div>
					</div>
				</div>
				<div className="row text-center">
					<div className="col-lg-6 algo-col">
						<div className="algo-box" style={{backgroundImage:`url(${pgg})`, backgroundPosition:"center center", backgroundRepeat: "no-repeat"}}>
							<div className="algo-blur">
								<FontAwesomeIcon
									icon={faLaugh}
									size="4x"
									className="algo-icon"
								/>
								<h5>Progressive Growing of GANs</h5>
								<p>
									Generarea de chipuri umane prin renumitul algoritm creat de
									nVidia.
								</p>
							</div>
						</div>
					</div>
					<div className="col-lg-6 algo-col">
						<div className="algo-box">
							<div className="algo-blur">
								<FontAwesomeIcon
									icon={faFileAlt}
									size="4x"
									className="algo-icon"
								/>
								<h5>GPT-3</h5>
								<p>
									Generarea de text în funcție de o fraza cheie prin algoritmii
									OpenAI.
								</p>
							</div>
						</div>
					</div>
					<div className="col-lg-6 algo-col">
						<div className="algo-box">
							<div className="algo-blur">
								<FontAwesomeIcon icon={faEye} size="4x" className="algo-icon" />
								<h5>Image deblur</h5>
								<p>Sporirea clarității unei imagini printr-un Autoencoder.</p>
							</div>
						</div>
					</div>
					<div className="col-lg-6 algo-col">
						<div className="algo-box">
							<div className="algo-blur">
								<FontAwesomeIcon
									icon={faHeart}
									size="4x"
									className="algo-icon"
								/>
								<h5>Analiză de sentiment</h5>
								<p>
									Analiză de text din care rezulta sentimentul și
									subiectivitatea datelor de intrare.
								</p>
							</div>
						</div>
					</div>
					<div className="col-lg-6 algo-col">
						<div className="algo-box">
							<div className="algo-blur">
								<FontAwesomeIcon
									icon={faCommentDots}
									size="4x"
									className="algo-icon"
								/>
								<h5>Percepția brandului</h5>
								<p>
									Generarea unor indici cheie referitoare la percepția unui
									brand.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Selector;
