import React, { Component } from "react";

import SideDrawer from "../Navigation/SideDrawer/SideDrawer";
import Toolbar from "../Navigation/Toolbar/Toolbar";

import "./Layout.css";

export default class Layout extends Component {
	state = {
		showSideDrawer: true,
	};

	SideDrawerClosedHandler = () => {
		this.setState({ showSideDrawer: false });
	};

	render() {
		return (
			// Fragment wraping components
			<>
				<Toolbar />
				<SideDrawer
					closed={this.SideDrawerClosedHandler}
					open={this.state.showSideDrawer}
				/>
				<main className="content">{this.props.children}</main>
			</>
		);
	}
}
