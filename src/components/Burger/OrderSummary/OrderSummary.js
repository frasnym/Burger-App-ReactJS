import React, { Component } from "react";
import Button from "../../UI/Button/Button";

export default class OrderSummary extends Component {
	// This could be a functional component, doesn't have to be class base component
	componentDidUpdate() {
		console.log("[OrderSummary]", "componentDidUpdate");
	}

	render() {
		const ingredientSummary = Object.keys(this.props.ingredients).map(
			(igKey) => {
				return (
					<li key={igKey}>
						<span style={{ textTransform: "capitalize" }}>
							{igKey}
						</span>
						: {this.props.ingredients[igKey]}
					</li>
				);
			}
		);

		return (
			<>
				<h3>Your Order</h3>
				<p>A delicious burger with the following ingredients:</p>
				<ul>{ingredientSummary}</ul>
				<p>Continue to checkout?</p>
				<p>
					<strong>Total Price: {this.props.price.toFixed(2)}</strong>
				</p>
				<Button btnType="Danger" clicked={this.props.purchaseCancelled}>
					CANCEL
				</Button>
				<Button
					btnType="Success"
					clicked={this.props.purchaseCuntinued}
				>
					CONTINUE
				</Button>
			</>
		);
	}
}
