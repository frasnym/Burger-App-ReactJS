import React from "react";

import SideDrawer from "../Navigation/SideDrawer/SideDrawer";
import Toolbar from "../Navigation/Toolbar/Toolbar";

import "./Layout.css";

export default function Layout(props) {
	return (
		// Fragment wraping components
		<>
			<Toolbar />
			<SideDrawer />
			<main className="content">{props.children}</main>
		</>
	);
}
