import axios, {AxiosResponse} from "axios";
import {usersStateType, userType} from "../ActionCreators/usersAC";
import {profileDataType} from "../Resduscers/ProfileReducer";
import {UserAuthStateType} from "../Resduscers/authUserReduser";

export type LoginResponseType = {
    data: LoginDataType;
    messages: string[];
    resultCode: number;
};

export type LoginDataType = {
    userId: number;
};

export type AuthMeResponseType = {
    data: AuthUserDataType;
    messages: string[];
    fieldsErrors: string[];
    resultCode: number;
};

export type AuthUserDataType = {
    id: number;
    login: string;
    email: string;
};

const axiosInstanse = axios.create({
    withCredentials:true,
    baseURL:"https://social-network.samuraijs.com/api/1.0/",
    headers:{
        "API-KEY":"e5f7a28d-5af7-4c3f-9534-8b1e9889bba1"
    }
})

export const authUserAPI = {
    authMe(){
        return axiosInstanse.get("auth/me").then((response:AxiosResponse)=>response.data)
    },
    loginUser(email: string, password: string, rememberMe: boolean){
        return axiosInstanse.post<LoginResponseType>("auth/login", {
            email,
            password,
            rememberMe,
        });
    },
    logoutUser() {
        return axiosInstanse.delete<AuthMeResponseType>("auth/login");
    },
}

export const usersAPI = {
    getUsers(curentPage:number, pageSize:number){
        return axiosInstanse.get(`users?page=${curentPage}&count=${pageSize}`).then((response:AxiosResponse)=>response.data)
    },
}

export const profileApi = {
    getUserProfile(id:number){
        return axiosInstanse.get<profileDataType>(`https://social-network.samuraijs.com/api/1.0/profile/${id}`).
        then((response:AxiosResponse)=>response.data);
    }
}








//this i try create self thunk
export const usersUpdater = async (setUsersIsload:(flag:boolean)=>void,
                                   setUsers:(users:Array<userType>)=>void,
                                   setUserTotalCount:(count:number)=>void,
                                   usersPage:usersStateType)=>{
    let count:number|null=null
    try {
        setUsersIsload(true);
        const {items,totalCount} =  await usersAPI.getUsers(usersPage.curentPage,usersPage.pageSize);
        setUsers(items)
        setUsersIsload(false);
        setUserTotalCount(totalCount)
        count=totalCount
    }catch(e){
        setUsersIsload(false);
        window.alert(e);
    }
    return count
}