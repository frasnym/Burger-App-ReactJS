import { put } from "redux-saga/effects";
import { authActionTypes } from "../actions/actionTypes";

export function* signoutSaga(action) {
	yield localStorage.removeItem("token");
	yield localStorage.removeItem("expirationDate");
	yield localStorage.removeItem("userId");

	yield put({
		type: authActionTypes.AUTH_SIGNOUT,
	});
}
