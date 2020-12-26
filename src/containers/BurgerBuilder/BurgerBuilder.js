import React, { Component } from "react";
import { connect } from "react-redux";

import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../utils/axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../components/HOC/withErrorHandler/withErrorHandler";
import * as actionTypes from "../../store/actions";

const INGREDIENT_PRICES = {
	salad: 0.5,
	bacon: 0.7,
	cheese: 0.4,
	meat: 1.3,
};

class BurgerBuilder extends Component {
	state = {
		totalPrice: 4,
		purchasable: false,
		purchasing: false,
		loading: false,
		error: false,
	};

	componentDidMount() {
		// axios
		// 	.get("/ingredients.json")
		// 	.then((res) => {
		// 		this.setState({ ingredients: res.data });
		// 	})
		// 	.catch((e) => {
		// 		this.setState({ error: true });
		// 	});
	}

	updatePurchaseState(ingredients) {
		// const ingredients = {
		// 	...this.props.ings, // Copy object
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
		const oldCount = this.props.ings[type]; // get current count of selected type
		const updatedCount = oldCount + 1; // +1 on selected type
		const updatedIngredients = {
			...this.props.ings, // copy the objects by spreading each object
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
		const oldCount = this.props.ings[type]; // get current count of selected type
		if (oldCount <= 0) {
			// Prevent negative number
			return;
		}
		const updatedCount = oldCount - 1; // -1 on selected type
		const updatedIngredients = {
			...this.props.ings, // copy the objects by spreading each object
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
		for (const i in this.props.ings) {
			if (Object.hasOwnProperty.call(this.props.ings, i)) {
				queryParams.push(
					encodeURIComponent(i) +
						"=" +
						encodeURIComponent(this.props.ings[i])
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
			...this.props.ings,
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

		if (this.props.ings) {
			burger = (
				<>
					<Burger ingredients={this.props.ings} />
					<BuildControls
						ingredientAdded={this.props.onIngredientAdded}
						ingredientRemoved={this.props.onIngredientRemoved}
						disabled={disabledInfo}
						purchasable={this.state.purchasable}
						price={this.state.totalPrice}
						ordered={this.purchaseHandler}
					/>
				</>
			);
			orderSummary = (
				<OrderSummary
					ingredients={this.props.ings}
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

const mapStateToProps = (state) => {
	return {
		ings: state.ingredients,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onIngredientAdded: (ingredientName) =>
			dispatch({
				type: actionTypes.ADD_INGREDIENT,
				ingredientName: ingredientName,
			}),
		onIngredientRemoved: (ingredientName) =>
			dispatch({
				type: actionTypes.REMOVE_INGREDIENT,
				ingredientName: ingredientName,
			}),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
