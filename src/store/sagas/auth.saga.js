import { put, delay, call } from "redux-saga/effects";
import axios from "axios";

import {
	signout,
	signoutSucceed,
	authRequest,
	authSuccess,
	checkAuthTimeout,
	authFailure,
} from "../actions/actions";

export function* signoutSaga(action) {
	yield call([localStorage, "removeItem"], "token");
	yield call([localStorage, "removeItem"], "expirationDate");
	yield call([localStorage, "removeItem"], "userId");

	yield put(signoutSucceed());
}

export function* checkAuthTimeoutSaga(action) {
	yield delay(action.expiresIn * 1000);
	yield put(signoutSucceed());
}

export function* authUserSaga(action) {
	yield put(authRequest());

	const authData = {
		email: action.email,
		password: action.password,
		returnSecureToken: true,
	};

	const API_KEY = process.env.REACT_APP_FIREBASE_WEB_API;
	let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;
	if (!action.isSignup) {
		url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;
	}

	try {
		const response = yield axios.post(url, authData);

		const expirationDate = yield new Date(
			new Date().getTime() + response.data.expiresIn * 1000
		);
		yield localStorage.setItem("token", response.data.idToken);
		yield localStorage.setItem("expirationDate", expirationDate);
		yield localStorage.setItem("userId", response.data.localId);

		yield put(authSuccess(response.data.idToken, response.data.localId));
		yield put(checkAuthTimeout(response.data.expiresIn));
	} catch (error) {
		yield put(authFailure(error.response.data.error));
	}
}

export function* authCheckStateSaga(action) {
	const token = yield localStorage.getItem("token");

	if (!token) {
		yield put(signout());
	} else {
		const expirationDate = yield new Date(
			localStorage.getItem("expirationDate")
		);
		if (expirationDate <= new Date()) {
			yield put(signout());
		} else {
			const userId = yield localStorage.getItem("userId");
			yield put(authSuccess(token, userId));
			yield put(
				checkAuthTimeout(
					(expirationDate.getTime() - new Date().getTime()) / 1000
				)
			);
		}
	}
}
