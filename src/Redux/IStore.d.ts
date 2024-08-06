// #region Interface Imports
import { IHomePage } from "@Interfaces";
import { ITradeState } from "@Reducers/trade";
// #endregion Interface Imports

export interface IStore {
    home: IHomePage.IStateProps;
    prediction: ITradeState;
}
