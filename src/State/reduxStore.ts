import {applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux";
import {profileActionType, profileReducer} from "../Resduscers/ProfileReducer";
import {dialogsActionType, dialogsReduser} from "../Resduscers/dialogsReduser";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {userActionType, userReducer} from "../Resduscers/usersReduser";
import thunkMiddleware ,{ ThunkAction, ThunkDispatch }from "redux-thunk"
import {AuthActionsType, authUserReduser} from "../Resduscers/authUserReduser";
import {
    navigationMenuActionType,
    navigationMenuReduser,
} from "../Resduscers/navigationMenuReduser";
import {AppActionsType} from "../ActionCreators/AppAC";
import {appReducer} from "../Resduscers/AppReducer";
import {reducer as formReducer} from "redux-form";
import {tanksPageActionsType} from "../ActionCreators/TanksPageAC";
import {TanksPageReduser} from "../Resduscers/TanksPageReduser";
import {salePageActionType} from "../ActionCreators/SalePageAC";

export const rootReducer = combineReducers({
    profilePage:profileReducer,
    dialogsPage:dialogsReduser,
    usersPage:userReducer,
    userAuth:authUserReduser,
    navigation:navigationMenuReduser,
    tanksPage:TanksPageReduser,
    App:appReducer,
    form:formReducer
}
);


export const store = createStore(rootReducer,applyMiddleware(thunkMiddleware));

export type AppRootStateType = ReturnType<typeof rootReducer>;
export type AppRootActionsType = dialogsActionType|
                                profileActionType|
                                userActionType|
                                AuthActionsType|
                                navigationMenuActionType|
                                AppActionsType|
                                tanksPageActionsType|
                                salePageActionType;
export type AppThunkType<ReturnType = void> = ThunkAction<
    ReturnType,
    AppRootStateType,
    unknown,
    AppRootActionsType
    >;

export type DispatchType = ThunkDispatch<AppRootStateType, unknown, AppRootActionsType>;

export const useAppDispatch = () => useDispatch<DispatchType>();

export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector;


// @ts-ignore
window.store = store;


