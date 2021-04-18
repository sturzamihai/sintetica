import React from "react";
import { useHistory } from "react-router";
import About from "./About";
import Algorithms from "./Algorithms";
import Hero from "./Hero";

const Landing = () => {
	return (
		<>
			<Hero />
			<About />
			<Algorithms />
		</>
	);
};

export default Landing;
