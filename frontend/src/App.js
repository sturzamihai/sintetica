import logo from "./logo.svg";
import "./style/App.scss";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Algorithms from "./components/Algorithms";
import Footer from "./components/Footer";
import GitHub from "./components/GitHub";

function App() {
	return (
		<>
			<Navbar />
			<Hero />
			<Algorithms />
			<About />
			<GitHub />
			<Footer />
		</>
	);
}

export default App;
