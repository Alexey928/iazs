import {AppThunkType, DispatchType} from "../State/reduxStore";
import {authUserAPI, profileApi} from "../API/dalAPI";
import { AxiosError } from "axios";


export const UserAuthState = {// auto types constant --> typeof constType =
   data:{
       id: null as number | null,
       email: null as string | null,
       login: null as string | null,
       isAuth: false,
   },
    isLading:false
};

export const setAuthUserDataAC = (//auto types function --> type actionType = typeof setAuthUserDataAC,
    id: number | null,
    login: string | null,
    email: string | null,
    isAuth: boolean
) =>
    ({
     type: "AUTH/SET-AUTH-USER-DATA",
     payload: {
      id,
      login,
      email,
      isAuth,
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
            const { id, login, email} = response.data;
            dispatch(setAuthUserDataAC(id, login, email, true));
            const res = await profileApi.getUserProfile(id);
            // const res = await profileAPI.getUserProfile(response.data.data.id);
            // dispatch(setAuthedUserProfileAC(res.data));
        }
    } catch (e){
        const err = e as Error | AxiosError<{ error: string }>;//for types error as "Error" , or  as "AxiosError"
    } finally {
        dispatch(setIsRequestProcessingStatusAC(false));
    }
};

export const loginTC =
    (email: string, password: string, rememberMe: boolean ): AppThunkType =>
        async (dispatch) => {
            dispatch(setIsRequestProcessingStatusAC(true));
            try {
                const response = await authUserAPI.loginUser(email, password, rememberMe);
                if (response.data.resultCode === 0) {
                    dispatch(authMeTC());
                    //dispatch(setLoginErrorAC(null));
                    //dispatch(setCaptchaUrlAC(null));
                }
                // if (response.data.resultCode === 1) {
                //     dispatch(setLoginErrorAC(response.data.messages[0]));
                // }
                // if (response.data.resultCode === 10) {
                //     dispatch(getCaptchaUrlTC());
                // }
            } catch (e) {
                //handleError(e, dispatch);
            } finally {
                dispatch(setIsRequestProcessingStatusAC(false));
            }
        };

export const logoutTC = (): AppThunkType => async (dispatch) => {
    dispatch(setIsRequestProcessingStatusAC(true));
    try {
        const response = await authUserAPI.logoutUser();
        if (response.data.resultCode === 0) {
            dispatch(setAuthUserDataAC(null, null, null, false));
            //dispatch(setAuthedUserProfileAC(null));
        }
    } catch (e) {
        alert(e);
       // handleError(e, dispatch);
    } finally {
        dispatch(setIsRequestProcessingStatusAC(false));
    }
};