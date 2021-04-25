import React from "react";
import banner from "../../assets/images/bg-pgg.png";
const { useState, useEffect } = React;

export const GAN = () => {
	const [requested, setRequested] = useState(false);
	const [response, setResponse] = useState({});
	const [elements, setElements] = useState([]);

	const sendRequest = async (e) => {
		e.preventDefault();
		if (requested) return;

		setRequested(true);

		await fetch("http://localhost:5000/api/pgg")
			.then((req) => req.json())
			.then((data) => setResponse(data));

		setRequested(false);
	};

	useEffect(() => {
		var keyIdx = 0;

		if (response.image) {
			var result_elements = (
				<img className="mx-auto d-block" key={++keyIdx} src={response.image} />
			);
			setElements(result_elements);
		} else if (response.error) {
			setElements([
				<div key={++keyIdx} className="alert alert-danger" role="alert">
					{response.error}
				</div>,
			]);
		}
	}, [response]);

	return (
		<>
			<div
				className="demo-banner"
				style={{
					background: `url(${banner}) no-repeat center center / cover`,
				}}
			>
				<div className="banner-overlay">
					<div className="container">
						<h2>Generare de imagini (profil)</h2>
					</div>
				</div>
			</div>
			<section className="page-section">
				<div className="container">
					<form onSubmit={sendRequest}>
						<div className="mb-3">
							<label htmlFor="formData" className="form-label">
								Apăsând pe butonul "Generează" de mai jos, vei descoperi puterea
								unui GAN(Generative Adversarial Network) care încearcă să imite
								cât de bine poate un chip uman. Algoritmul folosit este&nbsp;
								<a href="https://github.com/tkarras/progressive_growing_of_gans">
									Progressive growing of GANs
								</a>
								, un model state-of-the-art create de cei de la nVidia.
							</label>
						</div>
						<button
							id="submitForm"
							className="btn github-link mb-3"
							disabled={requested}
						>
							Generează
						</button>
					</form>
					{elements}
				</div>
			</section>
		</>
	);
};

export default GAN;
