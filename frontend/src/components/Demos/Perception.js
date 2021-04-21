import React from "react";
import banner from "../../assets/images/sentiment.png";
const { useState, useEffect } = React;

export const Perception = () => {
	const [requested, setRequested] = useState(false);
	const [response, setResponse] = useState({});
	const [blobData, setBlobData] = useState("");
	const [elements, setElements] = useState([]);
	const sendRequest = async (e) => {
		e.preventDefault();
		if (requested) return;

		setRequested(true);

		const requestOptions = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ blob: blobData }),
		};
		await fetch("http://localhost:5000/api/perception", requestOptions)
			.then((req) => req.json())
			.then((data) => setResponse(data));

		setRequested(false);
	};

	useEffect(() => {
		if (response.tags) {
			const proposition_tags = [];
			response.tags.forEach((element) => {
				proposition_tags.push(
					<div>
						<span>{element[0]}</span>
						<br />
						<span>{element[1]}</span>
					</div>
				);
			});
			setElements([
				<div className="info-header mt-3">
					<h3>Rezultatele analizei</h3>
					<span id="longSeparator"></span>
					<span id="shortSeparator"></span>
				</div>,
				<span class="btn statistic-badge btn-dark mr-2">
					Popoziții&nbsp;
					<span class="badge badge-light">{response.sentences}</span>
				</span>,
				<span
					class={
						"btn statistic-badge mr-2 " +
						(response.polarity > 0 ? "btn-success" : "btn-danger")
					}
				>
					Polaritate: {response.polarity > 0 ? "Pozitivă" : "Negativă"}&nbsp;
					<span class="badge badge-light">{response.polarity}</span>
				</span>,
				<span
					class={
						"btn statistic-badge " +
						(response.subjectivity < 0.5 ? "btn-success" : "btn-danger")
					}
				>
					Perspectivă:{" "}
					{response.subjectivity > 0.5 ? "Subiectivă" : "Obiectivă"}&nbsp;
					<span class="badge badge-light">{response.subjectivity}</span>
				</span>,
				...proposition_tags,
			]);
		} else if (response.error) {
			setElements([
				<div key="2" className="alert alert-danger" role="alert">
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
						<h2>Analiză de sentiment și percepția brandului</h2>
					</div>
				</div>
			</div>
			<section className="page-section">
				<div className="container">
					<form onSubmit={sendRequest}>
						<div className="mb-3">
							<label htmlFor="formData" className="form-label">
								Scrie mai jos o părere despre un brand/produs/serviciu/etc.
								exact cum ai face și pe Google Reviews, Emag sau alte locuri
								speciale pentru reviews.
							</label>
							<textarea
								className="form-control"
								id="formData"
								value={blobData}
								onChange={(value) => setBlobData(value.target.value)}
								rows="5"
								placeholder="Parerea mea despre produsul X este ..."
							></textarea>
						</div>
						<button
							id="submitForm"
							className="btn github-link mb-3"
							disabled={requested}
						>
							Trimite părerea
						</button>
					</form>
					{elements}
				</div>
			</section>
		</>
	);
};

export default Perception;
