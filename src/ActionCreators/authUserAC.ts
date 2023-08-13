import {AppThunkType, DispatchType} from "../State/reduxStore";
import {authUserAPI, profileApi} from "../API/dalAPI";
import { AxiosError } from "axios";


export const UserAuthState = {// auto types constant --> typeof constType =
   data:{
       _token: null as string | null,
   },
    isLading:false
};

export const setAuthUserDataAC = (//auto types function --> type actionType = typeof setAuthUserDataAC,
    login: string | null,
    _token: string | null,

) =>
    ({
     type: "AUTH/SET-AUTH-USER-DATA",
     payload: {
       login,
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
            dispatch(setAuthUserDataAC( login,_token));

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
                console.log(response);

                    //dispatch(setLoginErrorAC(null));
                    //dispatch(setCaptchaUrlAC(null));

                // if (response.data.resultCode === 1) {
                //     dispatch(setLoginErrorAC(response.data.messages[0]));
                // }
                // if (response.data.resultCode === 10) {
                //     dispatch(getCaptchaUrlTC());
                // }
            } catch (e) {
                console.log("eeeeeerrrrrooooorrrrr")
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
            dispatch(setAuthUserDataAC(null, null));
            //dispatch(setAuthedUserProfileAC(null));
        }
    } catch (e) {
        alert(e);
       // handleError(e, dispatch);
    } finally {
        dispatch(setIsRequestProcessingStatusAC(false));
    }
};