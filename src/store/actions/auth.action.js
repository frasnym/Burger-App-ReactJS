import { authActionTypes } from "./actionTypes";
// import axios from "axios";

export const signout = () => {
	// localStorage.removeItem("token");
	// localStorage.removeItem("expirationDate");
	// localStorage.removeItem("userId");

	return {
		// type: authActionTypes.AUTH_SIGNOUT,
		type: authActionTypes.AUTH_INITIATE_SIGNOUT,
	};
};

export const signoutSucceed = () => {
	return {
		type: authActionTypes.AUTH_SIGNOUT,
	};
};

export const checkAuthTimeout = (expiresIn) => {
	// return (dispatch) => {
	// 	setTimeout(() => {
	// 		dispatch(signout());
	// 	}, expiresIn * 1000); // Milisecond to Second
	// };
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
	// return (dispatch) => {
	// 	dispatch(authRequest());

	// 	const API_KEY = process.env.REACT_APP_FIREBASE_WEB_API;
	// 	let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;
	// 	if (!isSignup) {
	// 		url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;
	// 	}

	// 	const authData = {
	// 		email,
	// 		password,
	// 		returnSecureToken: true,
	// 	};

	// 	axios
	// 		.post(url, authData)
	// 		.then((res) => {
	// 			const expirationDate = new Date(
	// 				new Date().getTime() + res.data.expiresIn * 1000
	// 			);
	// 			localStorage.setItem("token", res.data.idToken);
	// 			localStorage.setItem("expirationDate", expirationDate);
	// 			localStorage.setItem("userId", res.data.localId);

	// 			dispatch(authSuccess(res.data.idToken, res.data.localId));
	// 			dispatch(checkAuthTimeout(res.data.expiresIn));
	// 		})
	// 		.catch((error) => {
	// 			dispatch(authFailure(error.response.data.error));
	// 		});
	// };
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
	return (dispatch) => {
		const token = localStorage.getItem("token");

		if (!token) {
			dispatch(signout());
		} else {
			const expirationDate = new Date(
				localStorage.getItem("expirationDate")
			);
			if (expirationDate <= new Date()) {
				dispatch(signout());
			} else {
				const userId = localStorage.getItem("userId");
				dispatch(authSuccess(token, userId));
				dispatch(
					checkAuthTimeout(
						(expirationDate.getTime() - new Date().getTime()) / 1000
					)
				);
			}
		}
	};
};
