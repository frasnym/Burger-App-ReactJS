import { authActionTypes } from "./actionTypes";
// import axios from "../../utils/axios-orders";

export const auth = (email, password) => {
	return (dispatch) => {
		dispatch({
			type: authActionTypes.AUTH_REQUEST,
		});

		// axios
		// 	.get("/ingredients.json")
		// 	.then((res) => {
		// 		dispatch({
		// 			type: authActionTypes.AUTH_SUCCESS,
		// 			authData: res.data,
		// 		});
		// 	})
		// 	.catch((error) => {
		// 		dispatch({
		//             type: authActionTypes.AUTH_FAILURE,
		//             error
		// 		});
		// 	});
	};
};
