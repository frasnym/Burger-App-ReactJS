import axios from "../../utils/axios-orders";
import { orderActionTypes } from "./actionTypes";

export const purchaseBurger = (orderData, token) => {
	return (dispatch) => {
		dispatch({
			type: orderActionTypes.PURCHASE_BURGER_REQUEST,
		});

		axios
			.post("/orders.json?auth=" + token, orderData)
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

export const purchaseInit = () => {
	return {
		type: orderActionTypes.PURCHASE_INIT,
	};
};

export const fetchOrders = (token) => {
	return (dispatch) => {
		dispatch({
			type: orderActionTypes.FETCH_ORDER_REQUEST,
		});

		axios
			.get("/orders.json?auth=" + token)
			.then((res) => {
				const fetchedOrders = [];
				for (const key in res.data) {
					fetchedOrders.push({ ...res.data[key], id: key });
				}

				dispatch({
					type: orderActionTypes.FETCH_ORDER_SUCCESS,
					orders: fetchedOrders,
				});
			})
			.catch((error) => {
				console.log({ error });
				dispatch({
					type: orderActionTypes.FETCH_ORDER_FAILURE,
					error,
				});
			});
	};
};
