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

	useEffect(() => {
		var keyIdx = 0;

		if (response.original) {
			var text_result = [];
			response.original.split("\n").forEach((element) => {
				text_result.push(<p>{element}</p>);
			});

			var translated_result = []
			if (response.translated) {
				translated_result = [
					<h4 key={++keyIdx}>Traducerea generării</h4>,
				];
				response.translated.split("\n").forEach((element) => {
					translated_result.push(<p>{element}</p>);
				});
			}

			var result_elements = [
				<div key={++keyIdx} className="info-header my-3">
					<h4 key={++keyIdx}>Rezultatele generării</h4>
					<span key={++keyIdx} id="longSeparator"></span>
					<span key={++keyIdx} id="shortSeparator"></span>
				</div>,
				React.createElement("div", { key: ++keyIdx }, ...text_result),
				React.createElement(
					"div",
					{ className: "info-header my-3", key: ++keyIdx },
					...translated_result
				),
			];
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
