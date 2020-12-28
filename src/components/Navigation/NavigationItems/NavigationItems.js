import React from "react";
import NavigationItem from "./NavigationItem/NavigationItem";

import "./NavigationItems.css";

export default function NavigationItems(props) {
	return (
		<ul className="NavigationItems">
			<NavigationItem link="/">Burget Builder</NavigationItem>

			{!props.isAuthenticated ? (
				<NavigationItem link="/auth">Authenticate</NavigationItem>
			) : (
				<>
					<NavigationItem link="/orders">Orders</NavigationItem>
					<NavigationItem link="/signout">SignOut</NavigationItem>
				</>
			)}
		</ul>
	);
}
