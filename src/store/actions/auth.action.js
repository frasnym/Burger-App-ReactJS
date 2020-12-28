import { authActionTypes } from "./actionTypes";
import axios from "axios";

export const auth = (email, password, isSignup) => {
	return (dispatch) => {
		dispatch({
			type: authActionTypes.AUTH_REQUEST,
		});

		const API_KEY = process.env.REACT_APP_FIREBASE_WEB_API;
		const authData = {
			email,
			password,
			returnSecureToken: true,
		};

		let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;
		if (!isSignup) {
			url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;
		}

		axios
			.post(url, authData)
			.then((res) => {
				dispatch({
					type: authActionTypes.AUTH_SUCCESS,
					idToken: res.data.idToken,
					userId: res.data.localId,
				});
			})
			.catch((error) => {
				dispatch({
					type: authActionTypes.AUTH_FAILURE,
					error: error.response.data.error,
				});
			});
	};
};
