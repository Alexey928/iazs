import React, {useEffect} from 'react';
import style from "./ProfilePage.module.css"
import ProfileDescription from "./ProfileDiscription/ProfileDescription";
import MyPpsts from "./MyPosts/MyPpsts";
import {profileDataType, ProfilePageStateType} from "../../Resduscers/ProfileReducer";
import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "../../State/reduxStore";
import {useParams} from "react-router-dom";
import Preloader from "../UIcomponets/generalPreloader/Preloader";
import {sestIsMenuActiveAC} from "../../ActionCreators/navigationMenuAC";
import background from "../../asets/1653409714_38-celes-club-p-beskonechnii-fon-dlya-saita-krasivie-39.jpg"
import {updateUserProfileDataTC} from "../../ActionCreators/profilePageAC";
import {UserAuthStateType} from "../../Resduscers/authUserReduser";


type ProfilePageType = {
    addPost:(newPost:string)=>void
    removePost:(postID:string)=>void
    setProfileData:(data:profileDataType)=>void
    setProfileIsLoad:(flag:boolean)=>void
}

function ProfilePage(props:ProfilePageType){


    const profilePage  = useSelector<AppRootStateType ,ProfilePageStateType>(state => state.profilePage);
    const auathData = useSelector<AppRootStateType,UserAuthStateType>(state=>state.userAuth)

    const defaultID = 2//пока так )
    const id  = useParams<'*'>();
    let userID = Number(id["*"])?Number(id["*"]):auathData.data.id?auathData.data.id:defaultID
    const dispatch = useAppDispatch();

    useEffect(()=>{
    dispatch(updateUserProfileDataTC(userID))
},[userID,dispatch])
    return(
        <div className={style.content}>
            <button onClick={()=>dispatch(sestIsMenuActiveAC())} className={style.button}>menu</button>
            <div className={style.contentHeader}><span>Profile page</span></div>
            {profilePage.isLoading?<Preloader/>:
            <div style={{backgroundImage:`url(${background})`}} className={style.descriptionAndPostWrapper}>
                <ProfileDescription profileData={profilePage.profileData}/>
                <MyPpsts removePost={props.removePost} addPost={props.addPost} posts = {profilePage.postItems}/>
            </div>}
        </div>
    )
}

export  default ProfilePage;