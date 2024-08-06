// #region Global Imports
import { combineReducers } from "redux";
// #endregion Global Imports

// #region Local Imports
import { HomeReducer } from "./home";
import TradeReducer from "./trade";
// #endregion Local Imports

export default combineReducers({
    home: HomeReducer,
    prediction: TradeReducer,
});
