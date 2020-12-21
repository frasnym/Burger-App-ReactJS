import React, { Component } from "react";

import Layout from "./components/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";

export default class App extends Component {
	state = {
		show: true,
	};

	// componentDidMount() {
	// 	setTimeout(() => {
	// 		this.setState({ show: false });
	// 	}, 5000);
	// }

	render() {
		return (
			<Layout>
				{this.state.show ? <BurgerBuilder /> : null}
				<Checkout />
			</Layout>
		);
	}
}
