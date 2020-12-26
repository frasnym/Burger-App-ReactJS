import React, { Component } from "react";
import { connect } from "react-redux";

import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../components/HOC/withErrorHandler/withErrorHandler";
import axios from "../../utils/axios-orders";
import * as burgerBuilderActions from "../../store/actions/actions";

class BurgerBuilder extends Component {
	state = {
		purchasing: false,
	};

	componentDidMount() {
		this.props.onInitIngredients();
	}

	updatePurchaseState(ingredients) {
		const sum = Object.keys(ingredients)
			.map((igKey) => {
				return ingredients[igKey];
			})
			.reduce((sum, el) => {
				return sum + el;
			}, 0);

		return sum > 0;
	}

	purchaseHandler = () => {
		this.setState({ purchasing: true });
	};

	purchaseCancelHandler = () => {
		this.setState({ purchasing: false });
	};

	purchaseContinueHandler = () => {
		this.props.history.push("/checkout");
	};

	render() {
		const disabledInfo = {
			...this.props.ings,
		};
		for (const key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0;
		}

		let burger = this.props.error ? (
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
						purchasable={this.updatePurchaseState(this.props.ings)}
						price={this.props.price}
						ordered={this.purchaseHandler}
					/>
				</>
			);
			orderSummary = (
				<OrderSummary
					ingredients={this.props.ings}
					purchaseCancelled={this.purchaseCancelHandler}
					purchaseCuntinued={this.purchaseContinueHandler}
					price={this.props.price}
				/>
			);
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
		ings: state.burgerBuilder.ingredients,
		price: state.burgerBuilder.totalPrice,
		error: state.burgerBuilder.error,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onIngredientAdded: (ingredientName) =>
			dispatch(burgerBuilderActions.addIngredient(ingredientName)),
		onIngredientRemoved: (ingredientName) =>
			dispatch(burgerBuilderActions.removeIngredient(ingredientName)),
		onInitIngredients: () =>
			dispatch(burgerBuilderActions.initIngredients()),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
