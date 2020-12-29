import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";

import asyncComponent from "./components/HOC/asyncComponent/asyncComponent";
import Layout from "./components/Layout/Layout";
import SignOut from "./containers/Auth/SignOut/SignOut";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import { authCheckState } from "./store/actions/actions";

const asyncCheckout = asyncComponent(() => {
	return import("./containers/Checkout/Checkout");
});
const asyncOrders = asyncComponent(() => {
	return import("./containers/Orders/Orders");
});
const asyncAuth = asyncComponent(() => {
	return import("./containers/Auth/Auth");
});
class App extends Component {
	componentDidMount() {
		this.props.onTryAutoSignin();
	}

	render() {
		let routes = (
			<>
				<Route path="/auth" component={asyncAuth} />
				<Route path="/" exact component={BurgerBuilder} />
			</>
		);

		if (this.props.isAuthenticated) {
			routes = (
				<>
					<Route path="/auth" component={asyncAuth} />
					<Route path="/signout" component={SignOut} />
					<Route path="/checkout" component={asyncCheckout} />
					<Route path="/orders" component={asyncOrders} />
					<Route path="/" exact component={BurgerBuilder} />
				</>
			);
		}
		return (
			<Layout>
				<Switch>
					{routes}
					<Redirect to="/" />
				</Switch>
			</Layout>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isAuthenticated: state.auth.token !== null,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onTryAutoSignin: () => dispatch(authCheckState()),
	};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
