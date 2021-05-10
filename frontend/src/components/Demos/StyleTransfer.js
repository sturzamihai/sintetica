import React from "react";
import banner from "../../assets/images/bg-ss.jpeg";
const { useState, useEffect } = React;

export const StyleTransfer = () => {
	const [requested, setRequested] = useState(false);
	const [response, setResponse] = useState({});
	const [styleImage, _setStyleImage] = useState("");
	const [contentImage, _setContentImage] = useState("");
	const [elements, setElements] = useState([]);

	const sendRequest = async (e) => {
		e.preventDefault();
		if (requested) return;

		setRequested(true);

		const requestOptions = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ style: styleImage, content: contentImage }),
		};
		await fetch(`${process.env.REACT_APP_API_LOCATION}/api/transfer`, requestOptions)
			.then((req) => req.json())
			.then((data) => setResponse(data));

		setRequested(false);
	};

	const processImage = (e, cb) => {
		const reader = new FileReader();
		const file = e.target.files[0];

		if (file !== undefined && reader !== undefined) {
			reader.onload = () => {
				cb(reader.result);
			};

			reader.readAsDataURL(file);
		} else cb(null);
	};

	const setStyleImage = (e) => {
		processImage(e, (image) => {
			_setStyleImage(image);
		});
	};

	const setContentImage = (e) => {
		processImage(e, (image) => {
			_setContentImage(image);
		});
	};

	useEffect(() => {
		if (response.image) {
			const resultElements = (
				<img
					className="mx-auto d-block"
					key="idata"
					alt="Auto-Generated with Sintetica"
					src={response.image}
				/>
			);
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
						<h2>Transfer de stil</h2>
					</div>
				</div>
			</div>
			<section className="page-section">
				<div className="container">
					<form onSubmit={sendRequest}>
						<div className="mb-3">
							<label htmlFor="formData" className="form-label">
								Încarcă două imagini, reprezentative din punct de vedere al
								contextului respectiv al stilului și descoperă cum algoritmul
								dezvoltat de cercetătorii de la&nbsp;
								<a href="https://www.tensorflow.org">Tensorflow</a>&nbsp;
								încearcă să le îmbine, ajungând la rezultate nemaivăzute.
							</label>
							<div className="row">
								<div className="col-lg-6">
									<div className="custom-file mb-2">
										<input
											type="file"
											className="custom-file-input"
											name="content"
											id="content"
											accept=".jpef, .png, .jpg, .jpeg"
											onChange={setContentImage}
										/>
										<label className="custom-file-label" htmlFor="content">
											Alege imaginea contextuală:
										</label>
									</div>
									{contentImage && (
										<div>
											<p>Previzualizare:</p>
											<img
												src={contentImage}
												height="150px"
												alt="Content preview"
												className="d-block mx-auto"
											/>
										</div>
									)}
								</div>
								<div className="col-lg-6">
									<div className="custom-file mb-2">
										<input
											type="file"
											className="custom-file-input"
											name="style"
											id="style"
											accept=".jpef, .png, .jpg, .jpeg"
											onChange={setStyleImage}
										/>
										<label className="custom-file-label" htmlFor="style">
											Alege imaginea stilistică:
										</label>
									</div>
									{styleImage && (
										<div>
											<p>Previzualizare:</p>
											<img
												src={styleImage}
												height="150px"
												alt="Style preview"
												className="d-block mx-auto"
											/>
										</div>
									)}
								</div>
							</div>
						</div>
						<button
							id="submitForm"
							className="btn github-link mb-3"
							disabled={requested}
						>
							Trimite
						</button>
					</form>
					{elements}
				</div>
			</section>
		</>
	);
};

export default StyleTransfer;
