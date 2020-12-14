import React from "react";

import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";

import "./SideDrawer.css";

export default function SideDrawer() {
	return (
		<div className="SideDrawer">
			<Logo />
			<nav>
				<NavigationItems />
			</nav>
		</div>
	);
}
