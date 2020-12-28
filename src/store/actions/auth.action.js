import { authActionTypes } from "./actionTypes";
import axios from "axios";

export const auth = (email, password) => {
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

		axios
			.post(
				`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
				authData
			)
			.then((res) => {
				console.log(res);
				dispatch({
					type: authActionTypes.AUTH_SUCCESS,
					authData: res.data,
				});
			})
			.catch((error) => {
				console.log(error);
				dispatch({
					type: authActionTypes.AUTH_FAILURE,
					error,
				});
			});
	};
};
