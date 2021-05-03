import React from "react";
import banner from "../../assets/images/bg-ss.jpeg";
const { useState, useEffect } = React;

export const StyleTransfer = () => {
	const [requested, setRequested] = useState(false);
	const [response, setResponse] = useState({});
	const [styleImage, _setStyleImage] = useState("");
	const [contextImage, _setContextImage] = useState("");
	const [elements, setElements] = useState([]);

	const sendRequest = async (e) => {
		e.preventDefault();
		if (requested) return;

		setRequested(true);

		const requestOptions = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ blob: "" }),
		};
		await fetch("http://localhost:5000/api/perception", requestOptions)
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

	const setContextImage = (e) => {
		processImage(e, (image) => {
			_setContextImage(image);
		});
	};

	useEffect(() => {
		if (response.tags) {
			const resultElements = [];

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
								Scrie mai jos o părere despre un brand/produs/serviciu/etc.
								exact cum ai face și pe Google Reviews, Emag sau alte locuri
								speciale pentru reviews.
							</label>
							<div className="row">
								<div className="col-lg-6">
									<div className="custom-file mb-2">
										<input
											type="file"
											className="custom-file-input"
											name="context"
											id="context"
											accept=".jpef, .png, .jpg"
											onChange={setContextImage}
										/>
										<label className="custom-file-label" htmlFor="context">
											Alege imaginea contextuala:
										</label>
									</div>
									{contextImage && (
										<div>
											<p>Previzualizare:</p>
											<img
												src={contextImage}
												height="150px"
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
											accept=".jpef, .png, .jpg"
											onChange={setStyleImage}
										/>
										<label className="custom-file-label" htmlFor="style">
											Alege imaginea stilistica:
										</label>
									</div>
									{styleImage && (
										<div>
											<p>Previzualizare:</p>
											<img
												src={styleImage}
												height="150px"
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
							Trimite părerea
						</button>
					</form>
					{elements}
				</div>
			</section>
		</>
	);
};

export default StyleTransfer;
