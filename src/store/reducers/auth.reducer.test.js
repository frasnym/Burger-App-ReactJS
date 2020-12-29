import reducer from "./auth.reducer";
import { authActionTypes } from "../actions/actionTypes";

describe("Auth Reducer", () => {
	it("should return initial state", () => {
		expect(reducer(undefined, {})).toEqual({
			token: null,
			userId: null,
			error: null,
			loading: null,
			authRedirectPath: "/",
		});
	});

	it("should store the token upon login", () => {
		expect(
			reducer(
				{
					token: null,
					userId: null,
					error: null,
					loading: null,
					authRedirectPath: "/",
				},
				{
					type: authActionTypes.AUTH_SUCCESS,
					idToken: "some-token",
					userId: "some-user-id",
				}
			)
		).toEqual({
			token: "some-token",
			userId: "some-user-id",
			error: null,
			loading: false,
			authRedirectPath: "/",
		});
	});
});
