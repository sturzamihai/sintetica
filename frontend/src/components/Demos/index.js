import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faHeart,
	faLaugh,
	faFileAlt,
	faCommentDots,
} from "@fortawesome/free-regular-svg-icons";
import { faExchangeAlt } from "@fortawesome/free-solid-svg-icons";
import { Link, Route, Switch, useRouteMatch } from "react-router-dom";

import pgg from "../../assets/images/bg-pgg.png";
import gpt from "../../assets/images/bg-gpt.jpg";
import ss from "../../assets/images/bg-ss.jpeg";
import sentiment from "../../assets/images/bg-sentiment.png";
import Perception from "./Perception";
import Generator from "./Generator";
import GAN from "./GAN";
import StyleTransfer from "./StyleTransfer";

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
										<h5>Generare de imagini (profil)</h5>
										<p>
											Vei descoperi puterea unui GAN care încearcă să imite cât
											de bine poate un chip uman.
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
											Vei crea un text nou prin intermediul unui prefix furnizat
											de tine.
										</p>
									</div>
								</div>
							</Link>
							<Link to={`${match.url}/transfer`} className="col-lg-6 algo-col">
								<div
									className="algo-box"
									style={{
										background: `url(${ss}) no-repeat center center / cover`,
									}}
								>
									<div className="algo-blur">
										<FontAwesomeIcon
											icon={faExchangeAlt}
											size="4x"
											className="algo-icon"
										/>
										<h5>Transfer de stil</h5>
										<p>
											Vei schimba ambientul general al unei poze prin
											intermediul caracteristicilor stilistice al altei poze.
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
											Vei vedea o analiză de text din care rezultă indici cheie
											referitori la percepția unui brand.
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
			<Route path={`${match.path}/gans`}>
				<GAN />
			</Route>
			<Route path={`${match.path}/transfer`}>
				<StyleTransfer/>
			</Route>
		</Switch>
	);
};

export default Selector;
