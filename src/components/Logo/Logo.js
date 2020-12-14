import React from "react";

import bugerLogo from "../../assets/images/burger-logo.png";

import "./Logo.css";

export default function Logo() {
	return (
		<div className="Logo">
			<img src={bugerLogo} alt="MyBurger" />
		</div>
	);
}
