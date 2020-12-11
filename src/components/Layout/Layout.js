import React from "react";

export default function Layout(props) {
	return (
		// Auxiliary wraping components
		<>
			<div>Toolbar, SideDrawer, Backdrop</div>
			<main>{props.children}</main>
		</>
	);
}
