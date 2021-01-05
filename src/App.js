import React, { useEffect, Suspense } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import SignOut from "./containers/Auth/SignOut/SignOut";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import { authCheckState } from "./store/actions/actions";

const Checkout = React.lazy(() => {
	return import("./containers/Checkout/Checkout");
});
const Orders = React.lazy(() => {
	return import("./containers/Orders/Orders");
});
const Auth = React.lazy(() => {
	return import("./containers/Auth/Auth");
});

const App = (props) => {
	const onTryAutoSignin = props.onTryAutoSignin;

	useEffect(() => {
		onTryAutoSignin();
	}, [onTryAutoSignin]);

	let routes = (
		<>
			<Route path="/auth" render={(props) => <Auth {...props} />} />
			<Route path="/" exact component={BurgerBuilder} />
		</>
	);

	if (props.isAuthenticated) {
		routes = (
			<>
				<Route path="/auth" render={(props) => <Auth {...props} />} />
				<Route path="/signout" component={SignOut} />
				<Route
					path="/checkout"
					render={(props) => <Checkout {...props} />}
				/>
				<Route
					path="/orders"
					render={(props) => <Orders {...props} />}
				/>
				<Route path="/" exact component={BurgerBuilder} />
			</>
		);
	}
	return (
		<Layout>
			<Switch>
				<Suspense fallback={<p>Loading...</p>}>
					{routes}
					<Redirect to="/" />
				</Suspense>
			</Switch>
		</Layout>
	);
};

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
