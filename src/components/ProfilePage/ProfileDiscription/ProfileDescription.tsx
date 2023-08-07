import React from 'react';
import style from "./ProfileDiscription.module.css"
import {profileDataType} from "../../../Resduscers/ProfileReducer";
import avatar from "../../../asets/avatar.jpg"

type profileDescriptionType = {
    profileData:profileDataType|null
}
const ProfileDescription = (props:profileDescriptionType) => {
    return (
        <div className={style.descriptionWrapper}>
            <div className={style.profilDiscription}>
                <img className={style.avatar} src={props.profileData?.photos.large||avatar}/>
                <span className={style.description}>{props.profileData?.aboutMe||"About mee"}</span>
            </div>
        </div>
    );
};

export default ProfileDescription;