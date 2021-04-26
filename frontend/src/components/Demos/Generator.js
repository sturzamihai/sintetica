import React from "react";
import banner from "../../assets/images/bg-gpt.jpg";
const { useState, useEffect } = React;

export const Generator = () => {
	const [requested, setRequested] = useState(false);
	const [response, setResponse] = useState({});
	const [contextData, setContextData] = useState("");
	const [elements, setElements] = useState([]);

	const sendRequest = async (e) => {
		e.preventDefault();
		if (requested) return;

		setRequested(true);

		const requestOptions = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ context: contextData }),
		};
		await fetch("http://localhost:5000/api/textgen", requestOptions)
			.then((req) => req.json())
			.then((data) => setResponse(data));

		setRequested(false);
	};

	const processText = (text) => {
		const result = text.split("\n").map((chunk, index) => 
			<p key={`pchunk${index}`}>{chunk}</p>
		);

		return result;
	};

	useEffect(() => {
		if (response.original) {
			const original = <div key="owrap">{processText(response.original)}</div>;
			const translated = response.translated ? (
				<div key="twrap">
					<h4 key="thead">Traducerea generării</h4>
					{processText(response.translated)}
				</div>
			) : null;

			var resultElements = [
				<div key="iwrap" className="info-header my-3">
					<h3 key="ihead">Rezultatele generării</h3>
					<span key="ishort" id="longSeparator"></span>
					<span key="ilong" id="shortSeparator"></span>
				</div>,
				original,
				translated,
			];
			setElements(resultElements);
		} else if (response.error) {
			setElements([
				<div key="ebody" className="alert alert-danger" role="alert">
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
						<h2>Generare de text</h2>
					</div>
				</div>
			</div>
			<section className="page-section">
				<div className="container">
					<form onSubmit={sendRequest}>
						<div className="mb-3">
							<label htmlFor="formData" className="form-label">
								Scrie mai jos o propoziție cu care vrei să înceapă textul
								generat (de preferat în engleză). Algoritmul folosit este{" "}
								<a href="https://openai.com/blog/better-language-models/">
									GPT-2
								</a>
								, un model state-of-the-art create de cei de la OpenAI.
							</label>
							<textarea
								className="form-control"
								id="formData"
								value={contextData}
								onChange={(value) => setContextData(value.target.value)}
								rows="5"
								placeholder="Propoziție ințială ..."
							></textarea>
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

export default Generator;
