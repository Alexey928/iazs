import {salePageActionType, salePageInitialState, salePageInitialStateType} from "../ActionCreators/SalePageAC";


export const SalesPageReducer = (state:salePageInitialStateType = salePageInitialState, action:salePageActionType):salePageInitialStateType=>{
    switch (action.type){
        case "SET-TRANSACTION":
            return {...state,transaction:action.payload}
        case "SET-DRIVER":
            return {...state,drivers:action.payload}
        case "SET-DRIVER-HASH":
            return  {...state,driversHash:action.payload}

        default:
            return state
    }
}



