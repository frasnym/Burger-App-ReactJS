import React from "react";
import { NavLink } from "react-router-dom";

import "./NavigationItem.css";

export default function NavigationItem(props) {
	return (
		<li className="NavigationItem">
			<NavLink to={props.link} exact>
				{props.children}
			</NavLink>
		</li>
	);
}
