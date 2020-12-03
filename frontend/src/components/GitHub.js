import React, { Component } from "react";
import "../style/github.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import {
	faPlus,
	faCode,
	faEquals,
	faHeart,
} from "@fortawesome/free-solid-svg-icons";

export class GitHub extends Component {
	render() {
		return (
			<section id="github" className="page-section">
				<div className="container">
					{/*<div className="row">
						<div className="col-lg-12">
							<div className="info-header">
								<h2>GitHub</h2>
								<span id="longSeparator"></span>
								<span id="shortSeparator"></span>
							</div>
						</div>
        </div>*/}
					<div class="section-body">
						<div className="row text-center align-items-center">
							<div className="col-lg-7 text-left">
								<h3>Tot codul proiectului este disponibil pe GitHub</h3>
								<p>
									De la pagina de prezentare pană la implementarea algorimilor
									și servirea lor printr-un API.{" "}
								</p>
								<a
									href="https://github.com/sturzamihai/sintetica"
									className="btn github-link"
								>
									VEZI ACUM
								</a>
							</div>
							<div className="col-lg-5">
								<FontAwesomeIcon
									icon={faGithub}
									size="3x"
									className="git-icons"
								/>
								<FontAwesomeIcon
									icon={faPlus}
									size="3x"
									className="git-icons"
								/>
								<FontAwesomeIcon
									icon={faCode}
									size="3x"
									className="git-icons"
								/>
								<FontAwesomeIcon
									icon={faEquals}
									size="3x"
									className="git-icons"
								/>
								<FontAwesomeIcon
									icon={faHeart}
									size="3x"
									className="git-icons"
									id="git-heart"
								/>
							</div>
						</div>
					</div>
				</div>
			</section>
		);
	}
}

export default GitHub;
