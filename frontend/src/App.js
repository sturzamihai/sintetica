import logo from "./logo.svg";
import "./style/App.scss";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Algorithms from "./components/Algorithms";

function App() {
	return (
		<>
			<Navbar />
			<Hero />
			<Algorithms />
			<About />
		</>
	);
}

export default App;
