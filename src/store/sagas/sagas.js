import { takeEvery, all } from "redux-saga/effects";

import { authActionTypes } from "../actions/actionTypes";
import {
	signoutSaga,
	checkAuthTimeoutSaga,
	authUserSaga,
	authCheckStateSaga,
} from "./auth.saga";

export function* watchAuth() {
	yield all([
		takeEvery(authActionTypes.AUTH_USER, authUserSaga),
		takeEvery(authActionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga),
		takeEvery(authActionTypes.AUTH_INITIATE_SIGNOUT, signoutSaga),
		takeEvery(authActionTypes.AUTH_CHECK_STATE, authCheckStateSaga),
	]);
}
