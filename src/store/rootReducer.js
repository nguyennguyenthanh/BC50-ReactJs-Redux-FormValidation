import { combineReducers } from "redux";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
    //Child reducer
    userReducer,
});

export default rootReducer;