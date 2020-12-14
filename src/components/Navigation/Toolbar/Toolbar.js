import React from "react";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";

import "./Toolbar.css";

export default function Toolbar(props) {
	return (
		<header className="Toolbar">
			<div>MENU</div>
			<div className="LogoToolbar">
				<Logo />
			</div>
			<nav className="DesktopOnly">
				<NavigationItems />
			</nav>
		</header>
	);
}
