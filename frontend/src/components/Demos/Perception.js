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
		var keyIdx = 0;

		if (response.tags) {
			var tag_map = {
				CC: "Conjuctie coordonatoare",
				CD: "Cifră cardinală",
				DT: "Determinant",
				EX: "Condiție existențială",
				FW: "Cuvânt străin",
				IN: "Prepoziție",
				JJ: "Adjectiv",
				JJR: "Adjectiv comparativ",
				JJS: "Adjectiv superlativ",
				LS: "Element al unei liste",
				MD: "Posibilitate",
				NN: "Substantiv",
				NNS: "Substantiv (Plural)",
				NNP: "Substantiv propriu",
				NNPS: "Substantiv propriu (Plural)",
				PDT: "Predeterminator",
				POS: "Terminație posesivă",
				PRP: "Pronume personal (I)",
				PRP$: "Pronume posesiv",
				RB: "Adverb",
				RBR: "Adverb comparativ",
				RBS: "Adverb superlativ",
				UH: "Interjectie",
				VB: "Verb",
				VBD: "Verb (Timpul trecut)",
				VBG: "Verb (Gerunziu/Participiu prezent)",
				VBN: "Verb (Participiu trecut)",
				VBP: "Verb(Prezent)",
				VBZ: "Verb(Prezent)",
			};
			var proposition_tags = [];
			if (response.foregin)
				proposition_tags.push(
					<div key={++keyIdx} className="alert alert-warning" role="alert">
						Datorită datelor limitate in limba aleasă ({response.foregin}),
						textul a fost tradus in engleză.
					</div>
				);
			response.tags.forEach((element, idx) => {
				var local_tags = [];
				element.forEach((part, poz) => {
					local_tags.push(
						<div className="col-auto text-center my-2" key={++keyIdx}>
							<span className="tag-word" key={++keyIdx}>
								{part[0]}
							</span>
							<br />
							<span className="tag-part" key={++keyIdx}>
								{tag_map[part[1]]}
							</span>
						</div>
					);
				});

				proposition_tags.push([
					<h6 className="mt-3 mb-1">Analiza propozitiei {idx + 1}</h6>,
					<hr style={{ width: "25%", float: "left", margin: 0 }} />,
					React.createElement(
						"div",
						{ className: "row", key: ++keyIdx },
						...local_tags
					),
				]);
			});

			var result_elements = [
				<div key={++keyIdx} className="info-header my-3">
					<h3 key={++keyIdx}>Rezultatele analizei</h3>
					<span key={++keyIdx} id="longSeparator"></span>
					<span key={++keyIdx} id="shortSeparator"></span>
				</div>,
				<span key={++keyIdx} className="btn statistic-badge btn-dark mr-2 mb-2">
					Popoziții&nbsp;
					<span key={++keyIdx} className="badge badge-light">
						{response.sentences}
					</span>
				</span>,
				<span
					key={++keyIdx}
					className={
						"btn statistic-badge mr-2 mb-2 " +
						(response.polarity > 0 ? "btn-success" : "btn-danger")
					}
				>
					Polaritate: {response.polarity > 0 ? "Pozitivă" : "Negativă"}&nbsp;
					<span key={++keyIdx} className="badge badge-light">
						{response.polarity}
					</span>
				</span>,
				<span
					key={++keyIdx}
					className={
						"btn statistic-badge mb-2 " +
						(response.subjectivity < 0.5 ? "btn-success" : "btn-danger")
					}
				>
					Perspectivă:{" "}
					{response.subjectivity > 0.5 ? "Subiectivă" : "Obiectivă"}&nbsp;
					<span key={++keyIdx} className="badge badge-light">
						{response.subjectivity}
					</span>
				</span>,
				...proposition_tags,
			];

			if (response.warning) {
				result_elements.unshift(
					<div key={++keyIdx} className="alert alert-warning" role="warning">
						{response.warning}
					</div>
				);
			}

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
