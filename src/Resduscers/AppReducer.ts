import {AppActionsType, initialState, AppStateType} from "../ActionCreators/AppAC";


export const appReducer = (state = initialState, action: AppActionsType): AppStateType => {
    switch (action.type) {
        case "APP/SET-IS-INITIALIZED": {
            return { ...state, isInitialized: action.isInitialized };
        }
        case "APP/SET-IS-REQUEST-PROCESSING-STATUS": {
            return { ...state, isRequestProcessing: action.isRequestProcessing };
        }
        case "APP/SET-APP-ERROR": {
            return { ...state, appError: action.appError };
        }
        default:
            return state;
    }
};