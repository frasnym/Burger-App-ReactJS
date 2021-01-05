import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../components/HOC/withErrorHandler/withErrorHandler";
import axios from "../../utils/axios-orders";
import * as actions from "../../store/actions/actions";

export const BurgerBuilder = (props) => {
	const [purchasing, setPurchasing] = useState(false);

	useEffect(() => {
		props.onInitIngredients();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const updatePurchaseState = (ingredients) => {
		const sum = Object.keys(ingredients)
			.map((igKey) => {
				return ingredients[igKey];
			})
			.reduce((sum, el) => {
				return sum + el;
			}, 0);

		return sum > 0;
	};

	const purchaseHandler = () => {
		if (props.isAuthenticated) {
			setPurchasing(true);
		} else {
			props.onSetAuthRedirectPath("/checkout");
			props.history.push("/auth");
		}
	};

	const purchaseCancelHandler = () => {
		setPurchasing(false);
	};

	const purchaseContinueHandler = () => {
		props.onInitPurchase();
		props.history.push("/checkout");
	};

	const disabledInfo = {
		...props.ings,
	};
	for (const key in disabledInfo) {
		disabledInfo[key] = disabledInfo[key] <= 0;
	}

	let burger = props.error ? <p>Ingredient can't be loaded</p> : <Spinner />;
	let orderSummary = null;

	if (props.ings) {
		burger = (
			<>
				<Burger ingredients={props.ings} />
				<BuildControls
					ingredientAdded={props.onIngredientAdded}
					ingredientRemoved={props.onIngredientRemoved}
					disabled={disabledInfo}
					purchasable={updatePurchaseState(props.ings)}
					price={props.price}
					isAuth={props.isAuthenticated}
					ordered={purchaseHandler}
				/>
			</>
		);
		orderSummary = (
			<OrderSummary
				ingredients={props.ings}
				purchaseCancelled={purchaseCancelHandler}
				purchaseCuntinued={purchaseContinueHandler}
				price={props.price}
			/>
		);
	}

	return (
		<>
			{burger}
			<Modal show={purchasing} modalClose={purchaseCancelHandler}>
				{orderSummary}
			</Modal>
		</>
	);
};

const mapStateToProps = (state) => {
	return {
		ings: state.burgerBuilder.ingredients,
		price: state.burgerBuilder.totalPrice,
		error: state.burgerBuilder.error,
		isAuthenticated: state.auth.token !== null,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onIngredientAdded: (ingredientName) =>
			dispatch(actions.addIngredient(ingredientName)),
		onIngredientRemoved: (ingredientName) =>
			dispatch(actions.removeIngredient(ingredientName)),
		onInitIngredients: () => dispatch(actions.initIngredients()),
		onInitPurchase: () => dispatch(actions.purchaseInit()),
		onSetAuthRedirectPath: (path) =>
			dispatch(actions.setAuthRedirectPath(path)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
