import React from 'react';
import style from "./Header.module.css"
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "../../State/reduxStore";
import {UserAuthStateType} from "../../Resduscers/authUserReduser";
import isAuthed from "../../asets/free-icon-approved-1478873.png"
import notAused from "../../asets/free-icon-x-button-458594.png"
import logo from "../../asets/—Pngtree—hand-painted japanese samurai knife_4236036 (1).png"
import {useNavigate} from "react-router-dom";
import {sestIsMenuActiveAC} from "../../ActionCreators/navigationMenuAC";
import {logoutTC} from "../../ActionCreators/authUserAC";


const Header = ()=>{
    const auth = useSelector<AppRootStateType,UserAuthStateType>(state => state.userAuth);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const navigateTologin = ()=>{
        dispatch(sestIsMenuActiveAC(false))
        navigate("/Login");
    }
    const logAut = ()=>{
        console.log("dddd")
        dispatch(logoutTC())
    }
    return (
        <header className={style.header}>
            <img src={logo} alt={"img"}/>
            <div className={style.auth}>
                <span onClick={!auth.data.isAuth?navigateTologin:logAut}>{!auth.data.isAuth?"login":"log-aut"}</span>
                <img src={auth.data.isAuth?isAuthed:notAused} alt={"img"}/>
            </div>
         </header>
    )
}
export default Header;