import { combineReducers } from "redux";

import burgerBuilderReducer from "./burgerBuilder.reducer";
import orderReducer from "./order.reducer";

const rootReducer = combineReducers({
	burgerBuilder: burgerBuilderReducer,
	order: orderReducer,
});

export default rootReducer;
