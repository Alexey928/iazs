import {AppThunkType, DispatchType} from "../State/reduxStore";
import {authUserAPI, profileApi} from "../API/dalAPI";
import { AxiosError } from "axios";


export const UserAuthState = {
   data:{
       _token: null as string | null,
       _user: null as string|null,
   },
    isLading:false as boolean,
    isAuth:true as boolean,
};

export const setAuthUserDataAC = (//auto types function --> type actionType = typeof setAuthUserDataAC,
    _user: string | null,
    _token: string | null,
    isAuth:boolean

) =>
    ({
     type: "AUTH/SET-AUTH-USER-DATA",
     isAuth,
     payload: {
       _user,
       _token,
     },
    } as const);

export const setIsRequestProcessingStatusAC = (flag:boolean)=>{
  return {type:"SET-REQUST-PROCESSING-STATUS",flag} as const
}

export const authMeTC = ():AppThunkType  => async (dispatch:DispatchType) => {
    dispatch(setIsRequestProcessingStatusAC(true));
    try {
        const response = await authUserAPI.authMe();
        if (response.resultCode === 0) {
            const { id, login,_token} = response.data;
            dispatch(setAuthUserDataAC( login,_token,true));
        }
    } catch (e){
        const err = e as Error | AxiosError<{ error: string }>;//for types error as "Error" , or  as "AxiosError"
    } finally {
        dispatch(setIsRequestProcessingStatusAC(false));
    }
};

export const loginTC = (email: string, password: string, rememberMe: boolean ): AppThunkType =>
        async (dispatch) => {
            dispatch(setIsRequestProcessingStatusAC(true));
            try {
                const {_user,_token} = await authUserAPI.loginUser(email, password, rememberMe);
                console.log(_user,_token);
                dispatch(setAuthUserDataAC( _user,_token,true));
            } catch (e) {
                console.log("Some error from login");
                alert("errrr")
            } finally {
                dispatch(setIsRequestProcessingStatusAC(false));
            }
        };

export const logoutTC = (): AppThunkType => async (dispatch) => {
    dispatch(setIsRequestProcessingStatusAC(true));
    try {
        const response = await authUserAPI.logoutUser();
        if (response.data.resultCode === 0) {
            dispatch(setAuthUserDataAC(null, null,false));
            //dispatch(setAuthedUserProfileAC(null));
        }
    } catch (e) {
        alert(e);
    } finally {
        dispatch(setIsRequestProcessingStatusAC(false));
    }
};