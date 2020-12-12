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
		ingredient: {
			salad: 0,
			bacon: 0,
			cheese: 0,
			meat: 0,
		},
		totalPrice: 4,
	};

	addIngredientHandler = (type) => {
		//* Updating current type count
		const oldCount = this.state.ingredient[type]; // get current count of selected type
		const updatedCount = oldCount + 1; // +1 on selected type
		const updatedIngredients = {
			...this.state.ingredient, // transform to array
		};
		updatedIngredients[type] = updatedCount;

		//* Updating total price
		const priceAddition = INGREDIENT_PRICES[type];
		const oldPrice = this.state.totalPrice;
		const newPrice = oldPrice + priceAddition;

		//* Update state
		this.setState({ totalPrice: newPrice, ingredient: updatedIngredients });
	};

	removeIngredientHandler = (type) => {};

	render() {
		return (
			<>
				<Burger ingredient={this.state.ingredient} />
				<BuildControls ingredientAdded={this.addIngredientHandler} />
			</>
		);
	}
}
