import React, { Component } from "react";

import Button from "../../../components/UI/Button/Button";

import "./ContactData.css";

export default class ContactData extends Component {
	state = {
		name: "",
		email: "",
		address: {
			street: "",
			postalCode: "",
		},
	};
	render() {
		return (
			<div className="ContactData">
				<h4>Enter data</h4>
				<form>
					<input
						className="Input"
						type="text"
						name="name"
						placeholder="your name"
					/>
					<input
						className="Input"
						type="email"
						name="email"
						placeholder="your email"
					/>
					<input
						className="Input"
						type="text"
						name="street"
						placeholder="your street"
					/>
					<input
						className="Input"
						type="text"
						name="postal"
						placeholder="your postal"
					/>
					<Button btnType="Success">ORDER</Button>
				</form>
			</div>
		);
	}
}
