import { authActionTypes } from "../actions/actionTypes";
import { updateObject } from "../../utils/utility";

const initialState = {
	token: null,
	userId: null,
	error: null,
	loading: null,
	authRedirectPath: "/",
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

const authSignout = (state, action) => {
	return updateObject(state, {
		error: action.error,
		token: null,
		userId: null,
	});
};

const setRedirectAuthPath = (state, action) => {
	return updateObject(state, {
		authRedirectPath: action.path,
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

		case authActionTypes.AUTH_SIGNOUT:
			return authSignout(state, action);

		case authActionTypes.SET_AUTH_REDIRECT_PATH:
			return setRedirectAuthPath(state, action);

		default:
			return state;
	}
};

export default reducer;
