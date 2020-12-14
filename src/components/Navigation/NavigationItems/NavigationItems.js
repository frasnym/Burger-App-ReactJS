import React from "react";
import NavigationItem from "./NavigationItem/NavigationItem";

import "./NavigationItems.css";

export default function NavigationItems() {
	return (
		<ul className="NavigationItems">
			<NavigationItem link="/" active>
				Burget Builder
			</NavigationItem>
			<NavigationItem link="/">Checkout</NavigationItem>
		</ul>
	);
}
