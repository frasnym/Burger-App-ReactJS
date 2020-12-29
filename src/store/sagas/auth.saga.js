import { put, delay } from "redux-saga/effects";

import { signoutSucceed } from "../actions/actions";

export function* signoutSaga(action) {
	yield localStorage.removeItem("token");
	yield localStorage.removeItem("expirationDate");
	yield localStorage.removeItem("userId");

	yield put(signoutSucceed());
}

export function* checkAuthTimeoutSaga(action) {
	yield delay(action.expiresIn * 1000);
	yield put(signoutSucceed());
}
