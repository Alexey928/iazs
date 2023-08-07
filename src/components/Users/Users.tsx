import React, {useEffect} from 'react';
import User from "./User";
import style from "./users.module.css"
import {getUsersThunkCreator, setUsersAC, usersStateType} from "../../ActionCreators/usersAC";
import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "../../State/reduxStore";
import Preloader from "../UIcomponets/generalPreloader/Preloader";
import PaginationBlock from "../PaginationBlock/PaginationBlock";
import {sestIsMenuActiveAC} from "../../ActionCreators/navigationMenuAC";

export type UsersPropsType = {
    followUnfollowUser:(userID:string)=>void
    setCurrentPage:(pageNumber:number)=>void
}


const Users:React.FC<UsersPropsType> = ({followUnfollowUser,setCurrentPage}) => {
    const dispatch = useAppDispatch();
    const usersPage = useSelector<AppRootStateType,usersStateType>(state => state.usersPage);

    const getUsers = (currentPage:number,pageSize:number)=>{
        dispatch(getUsersThunkCreator(currentPage,pageSize))// КОЛБЕК ДИСПАЧАЧЕШИЙ САНКУ
    }

useEffect(  ()=>{
    getUsers(usersPage.curentPage,usersPage.pageSize)
    return ()=>{dispatch(setUsersAC([]))}
},[usersPage.curentPage, usersPage.pageSize]);

return (
        <div className={style.usersContayner}>

            <PaginationBlock setCurentPage={setCurrentPage}
                             pagesCount={Math.ceil(usersPage.totalUsersCount/usersPage.pageSize)}
                             curentPage={usersPage.curentPage}

            />
            <button onClick={()=>dispatch(sestIsMenuActiveAC())} className={style.button}>menu</button>
            {usersPage.isLoading?<Preloader/>:usersPage.users.map((user)=><User
                followUnfolowUser={followUnfollowUser}
                key={user.id}
                user={user}/>)}
            <PaginationBlock setCurentPage={setCurrentPage}
                             pagesCount={Math.ceil(usersPage.totalUsersCount/usersPage.pageSize)}
                             curentPage={usersPage.curentPage}
            />
        </div>
    );
};

export default Users;