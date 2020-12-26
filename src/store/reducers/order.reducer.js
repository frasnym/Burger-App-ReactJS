import { orderActionTypes } from "../actions/actionTypes";

const initialState = {
	orders: [],
	loading: false,
	purchased: false,
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case orderActionTypes.PURCHASE_INIT:
			return {
				...state,
				purchased: false,
			};

		case orderActionTypes.PURCHASE_BURGER_REQUEST:
			return {
				...state,
				loading: true,
			};

		case orderActionTypes.PURCHASE_BURGER_SUCCESS:
			const newOrder = {
				...action.orderData,
				id: action.orderId,
			};
			return {
				...state,
				loading: false,
				orders: state.orders.concat(newOrder),
				purchased: true,
			};

		case orderActionTypes.PURCHASE_BURGER_FAILURE:
			console.log(action.error);
			return {
				...state,
				loading: false,
			};

		default:
			return state;
	}
};

export default reducer;
