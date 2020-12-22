import React, { Component } from "react";

import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../utils/axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../components/HOC/withErrorHandler/withErrorHandler";

const INGREDIENT_PRICES = {
	salad: 0.5,
	bacon: 0.7,
	cheese: 0.4,
	meat: 1.3,
};

class BurgerBuilder extends Component {
	state = {
		ingredients: null,
		totalPrice: 4,
		purchasable: false,
		purchasing: false,
		loading: false,
		error: false,
	};

	componentDidMount() {
		axios
			.get("/ingredients.json")
			.then((res) => {
				this.setState({ ingredients: res.data });
			})
			.catch((e) => {
				this.setState({ error: true });
			});
	}

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
		const queryParams = [];
		for (const i in this.state.ingredients) {
			if (Object.hasOwnProperty.call(this.state.ingredients, i)) {
				queryParams.push(
					encodeURIComponent(i) +
						"=" +
						encodeURIComponent(this.state.ingredients[i])
				);
			}
		}
		queryParams.push("price=" + this.state.totalPrice);
		const queryString = queryParams.join("&");
		this.props.history.push({
			pathname: "/checkout",
			search: `?${queryString}`,
		});
	};

	render() {
		const disabledInfo = {
			...this.state.ingredients,
		};
		for (const key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0;
		}

		let burger = this.state.error ? (
			<p>Ingredient can't be loaded</p>
		) : (
			<Spinner />
		);
		let orderSummary = null;

		if (this.state.ingredients) {
			burger = (
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
				</>
			);
			orderSummary = (
				<OrderSummary
					ingredients={this.state.ingredients}
					purchaseCancelled={this.purchaseCancelHandler}
					purchaseCuntinued={this.purchaseContinueHandler}
					price={this.state.totalPrice}
				/>
			);
		}

		if (this.state.loading) {
			orderSummary = <Spinner />;
		}

		return (
			<>
				{burger}
				<Modal
					show={this.state.purchasing}
					modalClose={this.purchaseCancelHandler}
				>
					{orderSummary}
				</Modal>
			</>
		);
	}
}

export default withErrorHandler(BurgerBuilder, axios);
