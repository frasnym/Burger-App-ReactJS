import React, { Component } from "react";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";

import Burger from "../../components/Burger/Burger";

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
	};

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
				/>
			</>
		);
	}
}
