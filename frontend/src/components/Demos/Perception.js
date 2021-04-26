import React from "react";
import banner from "../../assets/images/bg-sentiment.png";
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

	const processTags = (tags) => {
		var tagMap = {
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

		const propositionTags = tags.map((proposition, num) => (
			<div key={`twrap${num}`}>
				<h6 className="mt-3 mb-1" key={`theader${num}`}>
					Analiza propozitiei {num + 1}
				</h6>
				<hr style={{ width: "25%", float: "left", margin: 0 }} />
				<div className="row" key={`trow${num}`}>
					{proposition.map((tag, index) => (
						<div className="col-auto text-center my-2" key={`tcol${index}`}>
							<span className="tag-word" key={`tword${index}`}>
								{tag[0]}
							</span>
							<br />
							<span className="tag-part" key={`tpart${index}`}>
								{tagMap[tag[1]]}
							</span>
						</div>
					))}
				</div>
			</div>
		));

		return propositionTags;
	};

	const handleAPIWarnings = (warnings) => {
		const warningList = warnings.map((warn, index) => (
			<div key={`warn${index}`} className="alert alert-warning" role="alert">
				{warn}
			</div>
		));

		return warningList;
	};
	useEffect(() => {
		if (response.tags) {
			const tags = processTags(response.tags, response.foregin);
			const warnings = handleAPIWarnings(response.warnings);

			const resultElements = [
				warnings,
				<div key="iwrap" className="info-header my-3">
					<h3 key="ihead">Rezultatele analizei</h3>
					<span key="ishort" id="longSeparator"></span>
					<span key="ilong" id="shortSeparator"></span>
				</div>,
				<span key="swrap" className="btn statistic-badge btn-dark mr-2 mb-2">
					Popoziții&nbsp;
					<span key="scounter" className="badge badge-light">
						{response.sentences}
					</span>
				</span>,
				<span
					key="pwrap"
					className={
						"btn statistic-badge mr-2 mb-2 " +
						(response.polarity > 0 ? "btn-success" : "btn-danger")
					}
				>
					Polaritate: {response.polarity > 0 ? "Pozitivă" : "Negativă"}&nbsp;
					<span key="pcounter" className="badge badge-light">
						{response.polarity}
					</span>
				</span>,
				<span
					key="owrap"
					className={
						"btn statistic-badge mb-2 " +
						(response.subjectivity < 0.5 ? "btn-success" : "btn-danger")
					}
				>
					Perspectivă:&nbsp;
					{response.subjectivity > 0.5 ? "Subiectivă" : "Obiectivă"}&nbsp;
					<span key="ocounter" className="badge badge-light">
						{response.subjectivity}
					</span>
				</span>,
				tags,
			];

			setElements(resultElements);
		} else if (response.error) {
			setElements([
				<div key="ewrap" className="alert alert-danger" role="alert">
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
