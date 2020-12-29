import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import Auth from "./containers/Auth/Auth";
import SignOut from "./containers/Auth/SignOut/SignOut";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import Orders from "./containers/Orders/Orders";
import { authCheckState } from "./store/actions/actions";

class App extends Component {
	componentDidMount() {
		this.props.onTryAutoSignin();
	}

	render() {
		let routes = (
			<>
				<Route path="/auth" component={Auth} />
				<Route path="/" exact component={BurgerBuilder} />
			</>
		);

		if (this.props.isAuthenticated) {
			routes = (
				<>
					<Route path="/signout" component={SignOut} />
					<Route path="/checkout" component={Checkout} />
					<Route path="/orders" component={Orders} />
					<Route path="/" exact component={BurgerBuilder} />
				</>
			);
		}
		return (
			<Layout>
				{/* <Switch>
					<Route path="/auth" component={Auth} />
					<Route path="/signout" component={SignOut} />
					<Route path="/checkout" component={Checkout} />
					<Route path="/orders" component={Orders} />
					<Route path="/" exact component={BurgerBuilder} />
				</Switch> */}
				<Switch>{routes}</Switch>
				<Redirect to="/" />
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
