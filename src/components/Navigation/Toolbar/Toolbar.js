import React from "react";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import DrawerToggle from "../SideDrawer/DrawerToggle/DrawerToggle";

import "./Toolbar.css";

export default function Toolbar(props) {
	return (
		<header className="Toolbar">
			<DrawerToggle clicked={props.drawerToggleClick} />
			<div className="LogoToolbar">
				<Logo />
			</div>
			<nav className="DesktopOnly">
				<NavigationItems />
			</nav>
		</header>
	);
}
