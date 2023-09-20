import axios, {AxiosResponse} from "axios";
import {usersStateType, userType} from "../ActionCreators/usersAC";
import {profileDataType} from "../Resduscers/ProfileReducer";
import {AutoListType, fuelListType, StationType, TankDescriptionType, TankType} from "../ActionCreators/TanksPageAC";
import {DriverType, TransactionType} from "../ActionCreators/SalePageAC";

export type LoginResponseType = {
    data: LoginDataType;
    messages: string[];
    resultCode: number;
};

export type LoginDataType = {
    _user: string,
    _token:string
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
const corsProxyUrl = 'http://localhost:3001/proxy/';
const axiosInstanseForSocialNetvork = axios.create({
    baseURL:encodeURIComponent(corsProxyUrl+"http://demo.iazs.com.ua/index.php?r=api2/"),
})
const baseUrl = "http://demo.iazs.com.ua/index.php?r=api2/";



export const authUserAPI = {
    authMe(){
        return axiosInstanseForSocialNetvork.get("auth/me").then((response:AxiosResponse)=>response.data)
    },
    loginUser(login: string, password: string, rememberMe?: boolean){// remember mi is not used yet
        return axios.
        get<LoginDataType>(corsProxyUrl +
            encodeURIComponent(`${baseUrl}login&_user=${login}&_password=${password}`)).
            then((res)=> res.data);
    },
    logoutUser() {
        return axiosInstanseForSocialNetvork.delete<AuthMeResponseType>("auth/login");
    },
}

export const TanksPageAPI = {
    getTanksDescription(_token: string,_datefrom:string,limit:string){// remember mi is not used yet
        return axios.
        get<Array<TankDescriptionType>>(corsProxyUrl +
            encodeURIComponent(`${baseUrl}tank_state_list&_token=${_token}&_limit=${limit}&_datefrom${_datefrom}`)).
        then((res)=> res.data);
    },
    getTanks(_token:string){
        return axios.
        get<Array<TankType>>(corsProxyUrl+encodeURIComponent(`${baseUrl}tank_list&_token=${_token}`)).
        then(response=>response.data);
    },
    getStations(_token:string,){
        return axios.
            get<Array<StationType>>(corsProxyUrl+encodeURIComponent(`${baseUrl}azs_list&_token=${_token}`)).
            then(res=>res.data)
    },
    getFuelList(_token:string){
        return axios.
        get<fuelListType>(corsProxyUrl+encodeURIComponent(`${baseUrl}fuel_list&_token=${_token}`)).
        then(res=>res.data)
    },
    getAutoList(_token:string,_limit:string){
        return axios.
        get<Array<AutoListType>>(corsProxyUrl+encodeURIComponent(`${baseUrl}auto_list&_token=${_token}`)).
        then(res=>res.data)
    }
}


 export const  FuelReleasePageApi = {
    getTransactionList:( _token: string, _datefrom:string, limit:string )=>{
        return axios.
        get<Array<TransactionType>>(corsProxyUrl +
            encodeURIComponent(`${baseUrl}transaction_list&_token=${_token}&_limit=${limit}&_datefrom${_datefrom}`)).
        then((res)=> res.data);
    },
    getDriversList:( _token: string, limit:string)=> {
        return axios.
        get<Array<DriverType>>(corsProxyUrl +
            encodeURIComponent(`${baseUrl}driver_list&_token=${_token}&_limit=${limit}`)).
        then((res)=> res.data);
    }
}


export const usersAPI = {
    getUsers(curentPage:number, pageSize:number){
        return axiosInstanseForSocialNetvork.get(`users?page=${curentPage}&count=${pageSize}`).then((response:AxiosResponse)=>response.data)
    },
}

export const profileApi = {
    getUserProfile(id:number){
        return axiosInstanseForSocialNetvork.get<profileDataType>(`https://social-network.samuraijs.com/api/1.0/profile/${id}`).
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




