import "./style/App.scss";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import GitHub from "./components/GitHub";
import Selector from "./components/Demos";
import Landing from "./components/Landing";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";


const App = () => {
	return (
		<Router>
			<ScrollToTop/>
			<Navbar />
			<Switch>
				<Route path="/incearca">
					<Selector/>
				</Route>

				<Route path="/">
					<Landing/>
				</Route>
			</Switch>
			<GitHub />
			<Footer />
		</Router>
	);
}

export default App;
