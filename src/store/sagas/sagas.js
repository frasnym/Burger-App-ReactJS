import { takeEvery } from "redux-saga/effects";

import { authActionTypes } from "../actions/actionTypes";
import {
	signoutSaga,
	checkAuthTimeoutSaga,
	authUserSaga,
	authCheckStateSaga,
} from "./auth.saga";

export function* watchAuth() {
	yield takeEvery(authActionTypes.AUTH_USER, authUserSaga);
	yield takeEvery(authActionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga);
	yield takeEvery(authActionTypes.AUTH_INITIATE_SIGNOUT, signoutSaga);
	yield takeEvery(authActionTypes.AUTH_CHECK_STATE, authCheckStateSaga);
}
