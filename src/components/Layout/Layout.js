import React, { useState } from "react";
import { connect } from "react-redux";

import SideDrawer from "../Navigation/SideDrawer/SideDrawer";
import Toolbar from "../Navigation/Toolbar/Toolbar";

import "./Layout.css";

const Layout = (props) => {
	const [showSideDrawer, setShowSideDrawer] = useState(false);

	const sideDrawerClosedHandler = () => {
		setShowSideDrawer(false);
	};

	const sideDrawerToggleHandler = () => {
		setShowSideDrawer(!showSideDrawer);
	};

	return (
		// Fragment wraping components
		<>
			<Toolbar
				isAuth={props.isAuthenticated}
				drawerToggleClick={sideDrawerToggleHandler}
			/>
			<SideDrawer
				isAuth={props.isAuthenticated}
				closed={sideDrawerClosedHandler}
				open={showSideDrawer}
			/>
			<main className="content">{props.children}</main>
		</>
	);
};

const mapStateToProps = (state) => {
	return {
		isAuthenticated: state.auth.token !== null,
	};
};

export default connect(mapStateToProps)(Layout);
