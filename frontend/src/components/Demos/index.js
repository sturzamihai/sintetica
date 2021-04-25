import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faHeart,
	faLaugh,
	faFileAlt,
	faEye,
	faCommentDots,
} from "@fortawesome/free-regular-svg-icons";
import { Link, Route, Switch, useRouteMatch } from "react-router-dom";

import pgg from "../../assets/images/bg-pgg.png";
import gpt from "../../assets/images/bg-gpt.jpg";
import deblur from "../../assets/images/bg-deblur.jpg";
import sentiment from "../../assets/images/bg-sentiment.png";
import Perception from "./Perception";
import Generator from "./Generator";

const Selector = () => {
	let match = useRouteMatch();

	return (
		<Switch>
			<Route exact path={`${match.path}`}>
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
							<Link to={`${match.url}/gans`} className="col-lg-6 algo-col">
								<div
									className="algo-box"
									style={{
										background: `url(${pgg}) no-repeat center center / cover`,
									}}
								>
									<div className="algo-blur">
										<FontAwesomeIcon
											icon={faLaugh}
											size="4x"
											className="algo-icon"
										/>
										<h5>Progressive Growing of GANs</h5>
										<p>
											Generarea de chipuri umane prin renumitul algoritm creat
											de nVidia.
										</p>
									</div>
								</div>
							</Link>
							<Link to={`${match.url}/generator`} className="col-lg-6 algo-col">
								<div
									className="algo-box"
									style={{
										background: `url(${gpt}) no-repeat center center / cover`,
									}}
								>
									<div className="algo-blur">
										<FontAwesomeIcon
											icon={faFileAlt}
											size="4x"
											className="algo-icon"
										/>
										<h5>Generare de text</h5>
										<p>
											Crearea unui text nou prin intermediul unui prefix
											furnizat de utilizator.
										</p>
									</div>
								</div>
							</Link>
							<Link to={`${match.url}/deblur`} className="col-lg-6 algo-col">
								<div
									className="algo-box"
									style={{
										background: `url(${deblur}) no-repeat center center / cover`,
									}}
								>
									<div className="algo-blur">
										<FontAwesomeIcon
											icon={faEye}
											size="4x"
											className="algo-icon"
										/>
										<h5>Image deblur</h5>
										<p>
											Sporirea clarității unei imagini printr-un Autoencoder.
										</p>
									</div>
								</div>
							</Link>
							<Link to={`${match.url}/perceptie`} className="col-lg-6 algo-col">
								<div
									className="algo-box"
									style={{
										background: `url(${sentiment}) no-repeat center center / cover`,
									}}
								>
									<div className="algo-blur">
										<FontAwesomeIcon
											icon={faHeart}
											size="4x"
											className="algo-icon"
										/>
										<h5>Analiză de sentiment și percepția brandului</h5>
										<p>
											Analiză de text din care rezulta indici cheie referitoare
											la percepția unui brand.
										</p>
									</div>
								</div>
							</Link>
						</div>
					</div>
				</section>
			</Route>
			<Route path={`${match.path}/perceptie`}>
				<Perception />
			</Route>
			<Route path={`${match.path}/generator`}>
				<Generator />
			</Route>
		</Switch>
	);
};

export default Selector;
