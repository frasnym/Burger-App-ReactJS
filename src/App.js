import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import Auth from "./containers/Auth/Auth";
import SignOut from "./containers/Auth/SignOut/SignOut";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import Orders from "./containers/Orders/Orders";

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
				<Switch>
					<Route path="/auth" component={Auth} />
					<Route path="/signout" component={SignOut} />
					<Route path="/checkout" component={Checkout} />
					<Route path="/orders" component={Orders} />
					<Route path="/" exact component={BurgerBuilder} />
				</Switch>
			</Layout>
		);
	}
}
