import React from "react";

import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";

import "./CheckoutSummary.css";

export default function CheckoutSummary(props) {
	return (
		<div className="CheckoutSummary">
			<h1>Lets go</h1>
			<div style={{ width: "100%", height: "300px", margin: "auto" }}>
				<Burger ingredients={props.ingredients} />
			</div>
			<Button btnType="Danger" clicked>
				CANCEL
			</Button>
			<Button btnType="Success" clicked>
				CONTINUE
			</Button>
		</div>
	);
}
