import { authActionTypes } from "./actionTypes";

export const signout = () => {
	return {
		type: authActionTypes.AUTH_INITIATE_SIGNOUT,
	};
};

export const signoutSucceed = () => {
	return {
		type: authActionTypes.AUTH_SIGNOUT,
	};
};

export const checkAuthTimeout = (expiresIn) => {
	return {
		type: authActionTypes.AUTH_CHECK_TIMEOUT,
		expiresIn,
	};
};

export const authRequest = () => {
	return {
		type: authActionTypes.AUTH_REQUEST,
	};
};

export const authSuccess = (idToken, userId) => {
	return {
		type: authActionTypes.AUTH_SUCCESS,
		idToken,
		userId,
	};
};

export const authFailure = (error) => {
	return {
		type: authActionTypes.AUTH_FAILURE,
		error,
	};
};

export const auth = (email, password, isSignup) => {
	return {
		type: authActionTypes.AUTH_USER,
		email,
		password,
		isSignup,
	};
};

export const setAuthRedirectPath = (path) => {
	return (dispatch) => {
		dispatch({
			type: authActionTypes.SET_AUTH_REDIRECT_PATH,
			path,
		});
	};
};

export const authCheckState = () => {
	return {
		type: authActionTypes.AUTH_CHECK_STATE,
	};
};
