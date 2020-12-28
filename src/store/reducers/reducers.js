import { combineReducers } from "redux";

import burgerBuilderReducer from "./burgerBuilder.reducer";
import orderReducer from "./order.reducer";
import authReducer from "./auth.reducer";

const rootReducer = combineReducers({
	burgerBuilder: burgerBuilderReducer,
	order: orderReducer,
	auth: authReducer,
});

export default rootReducer;
