import React from "react";
import NavigationItem from "./NavigationItem/NavigationItem";

import "./NavigationItems.css";

export default function NavigationItems() {
	return (
		<ul className="NavigationItems">
			<NavigationItem link="/">Burget Builder</NavigationItem>
			<NavigationItem link="/orders">Orders</NavigationItem>
		</ul>
	);
}
