import { authActionTypes } from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
	token: null,
	userId: null,
	error: null,
	loading: null,
};

const authRequest = (state, action) => {
	return updateObject(state, { error: null, loading: true });
};

const authSuccess = (state, action) => {
	return updateObject(state, {
		error: null,
		loading: false,
		token: action.idToken,
		userId: action.userId,
	});
};

const authFailure = (state, action) => {
	return updateObject(state, {
		error: action.error,
		loading: false,
	});
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case authActionTypes.AUTH_REQUEST:
			return authRequest(state, action);

		case authActionTypes.AUTH_SUCCESS:
			return authSuccess(state, action);

		case authActionTypes.AUTH_FAILURE:
			return authFailure(state, action);

		default:
			return state;
	}
};

export default reducer;
