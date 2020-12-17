import React, { Component } from "react";

import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../utils/axios-orders";

const INGREDIENT_PRICES = {
	salad: 0.5,
	bacon: 0.7,
	cheese: 0.4,
	meat: 1.3,
};

export default class BurgerBuilder extends Component {
	state = {
		ingredients: {
			salad: 0,
			bacon: 0,
			cheese: 0,
			meat: 0,
		},
		totalPrice: 4,
		purchasable: false,
		purchasing: false,
	};

	updatePurchaseState(ingredients) {
		// const ingredients = {
		// 	...this.state.ingredients, // Copy object
		// };
		const sum = Object.keys(ingredients)
			.map((igKey) => {
				return ingredients[igKey];
			})
			.reduce((sum, el) => {
				return sum + el;
			}, 0);

		this.setState({ purchasable: sum > 0 });
	}

	addIngredientHandler = (type) => {
		//* Updating current type count
		const oldCount = this.state.ingredients[type]; // get current count of selected type
		const updatedCount = oldCount + 1; // +1 on selected type
		const updatedIngredients = {
			...this.state.ingredients, // copy the objects by spreading each object
		};
		updatedIngredients[type] = updatedCount;

		//* Updating total price
		const priceAddition = INGREDIENT_PRICES[type];
		const oldPrice = this.state.totalPrice;
		const newPrice = oldPrice + priceAddition;

		//* Update state
		this.setState({
			totalPrice: newPrice,
			ingredients: updatedIngredients,
		});
		this.updatePurchaseState(updatedIngredients);
	};

	removeIngredientHandler = (type) => {
		//* Updating current type count
		const oldCount = this.state.ingredients[type]; // get current count of selected type
		if (oldCount <= 0) {
			// Prevent negative number
			return;
		}
		const updatedCount = oldCount - 1; // -1 on selected type
		const updatedIngredients = {
			...this.state.ingredients, // copy the objects by spreading each object
		};
		updatedIngredients[type] = updatedCount;

		//* Updating total price
		const priceDeduction = INGREDIENT_PRICES[type];
		const oldPrice = this.state.totalPrice;
		const newPrice = oldPrice - priceDeduction;

		//* Update state
		this.setState({
			totalPrice: newPrice,
			ingredients: updatedIngredients,
		});
		this.updatePurchaseState(updatedIngredients);
	};

	purchaseHandler = () => {
		this.setState({ purchasing: true });
	};

	purchaseCancelHandler = () => {
		this.setState({ purchasing: false });
	};

	purchaseContinueHandler = () => {
		// alert("continue");
		const data = {
			ingredients: this.state.ingredients,
			price: this.state.totalPrice,
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
				console.log(res);
			})
			.catch((e) => console.log(e));
	};

	render() {
		const disabledInfo = {
			...this.state.ingredients,
		};
		for (const key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0;
		}
		return (
			<>
				<Burger ingredients={this.state.ingredients} />
				<BuildControls
					ingredientAdded={this.addIngredientHandler}
					ingredientRemoved={this.removeIngredientHandler}
					disabled={disabledInfo}
					purchasable={this.state.purchasable}
					price={this.state.totalPrice}
					ordered={this.purchaseHandler}
				/>
				<Modal
					show={this.state.purchasing}
					modalClose={this.purchaseCancelHandler}
				>
					<OrderSummary
						ingredients={this.state.ingredients}
						purchaseCancelled={this.purchaseCancelHandler}
						purchaseCuntinued={this.purchaseContinueHandler}
						price={this.state.totalPrice}
					/>
				</Modal>
			</>
		);
	}
}
