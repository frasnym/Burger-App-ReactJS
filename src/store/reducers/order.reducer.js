import { orderActionTypes } from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
	orders: [],
	loading: false,
	purchased: false,
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case orderActionTypes.PURCHASE_INIT:
			return updateObject(state, {
				purchased: false,
			});

		case orderActionTypes.PURCHASE_BURGER_REQUEST:
			return updateObject(state, {
				loading: true,
			});

		case orderActionTypes.PURCHASE_BURGER_SUCCESS:
			const newOrder = updateObject(action.orderData, {
				id: action.orderId,
			});
			return updateObject(state, {
				loading: false,
				orders: state.orders.concat(newOrder),
				purchased: true,
			});

		case orderActionTypes.PURCHASE_BURGER_FAILURE:
			return updateObject(state, {
				loading: false,
			});

		case orderActionTypes.FETCH_ORDER_REQUEST:
			return updateObject(state, {
				loading: true,
			});

		case orderActionTypes.FETCH_ORDER_SUCCESS:
			return updateObject(state, {
				loading: false,
				orders: action.orders,
			});

		case orderActionTypes.FETCH_ORDER_FAILURE:
			return updateObject(state, {
				loading: false,
			});

		default:
			return state;
	}
};

export default reducer;
