import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

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

	const ings = useSelector((state) => state.burgerBuilder.ingredients);
	const price = useSelector((state) => state.burgerBuilder.totalPrice);
	const error = useSelector((state) => state.burgerBuilder.error);
	const isAuthenticated = useSelector((state) => state.auth.token !== null);

	const dispatch = useDispatch();
	const onIngredientAdded = (ingredientName) =>
		dispatch(actions.addIngredient(ingredientName));
	const onIngredientRemoved = (ingredientName) =>
		dispatch(actions.removeIngredient(ingredientName));
	const onInitIngredients = useCallback(
		() => dispatch(actions.initIngredients()),
		[dispatch]
	);
	const onInitPurchase = () => dispatch(actions.purchaseInit());
	const onSetAuthRedirectPath = (path) =>
		dispatch(actions.setAuthRedirectPath(path));

	useEffect(() => {
		onInitIngredients();
	}, [onInitIngredients]);

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
		if (isAuthenticated) {
			setPurchasing(true);
		} else {
			onSetAuthRedirectPath("/checkout");
			props.history.push("/auth");
		}
	};

	const purchaseCancelHandler = () => {
		setPurchasing(false);
	};

	const purchaseContinueHandler = () => {
		onInitPurchase();
		props.history.push("/checkout");
	};

	const disabledInfo = {
		...ings,
	};
	for (const key in disabledInfo) {
		disabledInfo[key] = disabledInfo[key] <= 0;
	}

	let burger = error ? <p>Ingredient can't be loaded</p> : <Spinner />;
	let orderSummary = null;

	if (ings) {
		burger = (
			<>
				<Burger ingredients={ings} />
				<BuildControls
					ingredientAdded={onIngredientAdded}
					ingredientRemoved={onIngredientRemoved}
					disabled={disabledInfo}
					purchasable={updatePurchaseState(ings)}
					price={price}
					isAuth={isAuthenticated}
					ordered={purchaseHandler}
				/>
			</>
		);
		orderSummary = (
			<OrderSummary
				ingredients={ings}
				purchaseCancelled={purchaseCancelHandler}
				purchaseCuntinued={purchaseContinueHandler}
				price={price}
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

export default withErrorHandler(BurgerBuilder, axios);
