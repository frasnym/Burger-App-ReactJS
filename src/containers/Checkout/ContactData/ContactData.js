import React, { Component } from "react";

import Button from "../../../components/UI/Button/Button";
import Input from "../../../components/UI/Input/Input";
import Spinner from "../../../components/UI/Spinner/Spinner";
import axios from "../../../utils/axios-orders";

import "./ContactData.css";

export default class ContactData extends Component {
	state = {
		name: "",
		email: "",
		address: {
			street: "",
			postalCode: "",
		},
		loading: false,
	};

	orderHandler = (event) => {
		event.preventDefault();
		console.log(this.props.ingredients);

		this.setState({ loading: true });
		const data = {
			ingredients: this.props.ingredients,
			price: this.props.price,
			customer: {
				name: "Mico Furazoo",
				address: {
					street: "Test street 4b",
					zipCode: "465465",
					country: "Indonesia",
				},
				email: "mico@email.com",
			},
			deliveryMethod: "fastest",
		};
		axios
			.post("/orders.json", data)
			.then((res) => {
				this.setState({ loading: false });
				this.props.history.push("/");
			})
			.catch((e) => {
				this.setState({ loading: false });
				console.log(e);
			});
	};

	render() {
		let form = (
			<form>
				<Input
					inputtype="input"
					type="text"
					name="name"
					placeholder="your name"
				/>
				<Input
					inputtype="input"
					type="email"
					name="email"
					placeholder="your email"
				/>
				<Input
					inputtype="input"
					type="text"
					name="street"
					placeholder="your street"
				/>
				<Input
					inputtype="input"
					type="text"
					name="postal"
					placeholder="your postal"
				/>
				<Button btnType="Success" clicked={this.orderHandler}>
					ORDER
				</Button>
			</form>
		);
		if (this.state.loading) {
			form = <Spinner />;
		}
		return (
			<div className="ContactData">
				<h4>Enter data</h4>
				{form}
			</div>
		);
	}
}
