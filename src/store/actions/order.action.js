import axios from "../../utils/axios-orders";
import { orderActionTypes } from "./actionTypes";

export const purchaseBurger = (orderData) => {
	return (dispatch) => {
		dispatch({
			type: orderActionTypes.PURCHASE_BURGER_REQUEST,
		});

		axios
			.post("/orders.json", orderData)
			.then((res) => {
				dispatch({
					type: orderActionTypes.PURCHASE_BURGER_SUCCESS,
					orderId: res.data.name,
					orderData,
				});
			})
			.catch((error) => {
				dispatch({
					type: orderActionTypes.PURCHASE_BURGER_FAILURE,
					error,
				});
			});
	};
};
