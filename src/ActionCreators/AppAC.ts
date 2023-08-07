import {AppThunkType, DispatchType} from "../State/reduxStore";
import {authMeTC} from "./authUserAC";

export const initialState = {
    isInitialized: false,
    isRequestProcessing: false,
    appError: null as string | null,
};

export const setIsInitializedAC = (isInitialized: boolean) =>
    ({
        type: "APP/SET-IS-INITIALIZED",
        isInitialized,
    } as const);

export const setIsRequestProcessingStatusAC = (isRequestProcessing: boolean) =>
    ({
        type: "APP/SET-IS-REQUEST-PROCESSING-STATUS",
        isRequestProcessing,
    } as const);
export const setAppErrorAC = (appError: string | null) =>
    ({ type: "APP/SET-APP-ERROR", appError } as const);



export const initializeAppTC = (): AppThunkType => async (dispatch:DispatchType) => {
    try {
        await dispatch(authMeTC());
    } catch (e) {

    } finally {
         dispatch(setIsInitializedAC(true));
    }
};

export type SetAppErrorType = ReturnType<typeof setAppErrorAC>;
export type AppStateType = typeof initialState;
export type AppActionsType =
    | ReturnType<typeof setIsInitializedAC>
    | ReturnType<typeof setIsRequestProcessingStatusAC>
    | SetAppErrorType;

