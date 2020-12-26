import axios from "../../utils/axios-orders";
import * as actionTypes from "./actionTypes";

export const addIngredient = (ingredientName) => {
	return {
		type: actionTypes.ADD_INGREDIENT,
		ingredientName,
	};
};

export const removeIngredient = (ingredientName) => {
	return {
		type: actionTypes.REMOVE_INGREDIENT,
		ingredientName,
	};
};

export const initIngredients = () => {
	return (dispatch) => {
		dispatch({
			type: actionTypes.FETCH_INGREDIENTS_REQUEST,
		});

		axios
			.get("/ingredients.json")
			.then((res) => {
				dispatch({
					type: actionTypes.FETCH_INGREDIENTS_SUCCESS,
					ingredients: res.data,
				});
			})
			.catch((err) => {
				dispatch({
					type: actionTypes.FETCH_INGREDIENTS_FAILURE,
				});
			});
	};
};
