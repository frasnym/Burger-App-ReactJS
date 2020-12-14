import React, { Component } from "react";

import SideDrawer from "../Navigation/SideDrawer/SideDrawer";
import Toolbar from "../Navigation/Toolbar/Toolbar";

import "./Layout.css";

export default class Layout extends Component {
	state = {
		showSideDrawer: false,
	};

	sideDrawerClosedHandler = () => {
		this.setState({ showSideDrawer: false });
	};

	sideDrawerToggleHandler = () => {
		this.setState((prevState) => {
			return { showSideDrawer: !this.state.showSideDrawer };
		});
	};

	render() {
		return (
			// Fragment wraping components
			<>
				<Toolbar drawerToggleClick={this.sideDrawerToggleHandler} />
				<SideDrawer
					closed={this.sideDrawerClosedHandler}
					open={this.state.showSideDrawer}
				/>
				<main className="content">{this.props.children}</main>
			</>
		);
	}
}
