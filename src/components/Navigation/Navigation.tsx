import React from 'react';
import style from "./Nawigation.module.css"
import {NavLink, useLocation} from "react-router-dom";
import {AppRootStateType, useAppDispatch} from "../../State/reduxStore";
import {useSelector} from "react-redux";
import {navigationStateType} from "../../Resduscers/navigationMenuReduser";
import {setIsMenuActiveAC} from "../../ActionCreators/navigationMenuAC";
import {UserAuthStateType} from "../../Resduscers/authUserReduser";


const Navigation = ()=>{
    //const location  = useLocation()//<---- interesting object ))
    const navigationState = useSelector<AppRootStateType,navigationStateType>(state => state.navigation);
    const auth = useSelector<AppRootStateType, UserAuthStateType>(state => state.userAuth)
    const dispatch = useAppDispatch();


    return (
       <div className={style.navigationWrapper}>
           <nav className={navigationState.shoveIt?`${style.navigation} ${style.navigationSelected}`:style.navigation}>
               <ul className={style.menu}>
                   <li>
                       <NavLink to={auth.isAuth?"/Carts":"/"} className={({ isActive }) => (isActive ? `${style.active} ${style.act}` :'')}>Карты</NavLink>
                   </li>
                   <li>
                       <NavLink to={auth.isAuth?"/Operation":"/"} className={({ isActive }) => (isActive ? `${style.active} ${style.act}` :'')}>Операции</NavLink>
                   </li>
                   <li >
                       <ul className={style.submenu}>
                           <li>
                               <NavLink
                                   onClick={()=>{dispatch(setIsMenuActiveAC(false))}}
                                   to={auth.isAuth?"/ReferencePage":"/"}
                                   className={style.act}
                                   >Организации
                               </NavLink>
                           </li>
                           <li>
                               <NavLink
                                   onClick={()=>{dispatch(setIsMenuActiveAC(false))}}
                                   to={auth.isAuth?"/ReferencePage/supplier/":"/"}
                                   className={style.act}
                                   >Поставшики
                               </NavLink>
                           </li>
                           <li>
                               <NavLink
                                   onClick={()=>{dispatch(setIsMenuActiveAC(false))}}
                                   to={auth.isAuth?"/ReferencePage/drivers/":"/"}
                                   className={style.act}
                               >Водители
                               </NavLink>
                           </li>
                           <li>
                               <NavLink
                                   onClick={()=>{dispatch(setIsMenuActiveAC(false))}}
                                   to={auth.isAuth?"/ReferencePage/AutoModels":"/"}
                                   className={style.act}
                               >Модели авто
                               </NavLink>
                           </li>
                           <li>
                               <NavLink
                                   onClick={()=>{dispatch(setIsMenuActiveAC(false))}}
                                   to={auth.isAuth?"/ReferencePage/cars":"/"}
                                   className={style.act}
                               >Автомобили
                               </NavLink>
                           </li>
                       </ul>
                       <NavLink to={auth.isAuth?"/ReferencePage":"/"}
                                className={({ isActive }) => (isActive ? `${style.active} ${style.act}` :'')}
                       >Справочники
                       </NavLink>
                   </li>
                   <li>
                       <NavLink to={auth.isAuth?"/Music":"/"}
                                className={({ isActive }) => (isActive ? `${style.act}` :'')}
                                >Отчеты
                       </NavLink>
                       <ul className={style.submenu}>
                           <li>
                               <NavLink
                                   onClick={()=>{dispatch(setIsMenuActiveAC(false))}}
                                   to={auth.isAuth?"/Tanks":"/"}
                                   className={style.act}
                               >Состояние
                               </NavLink>
                           </li>
                           <li>
                               <NavLink
                                   onClick={()=>{dispatch(setIsMenuActiveAC(false))}}
                                   to={auth.isAuth?"/Tanks/Sales":"/"}
                                   className={style.act}
                               >Отгрузки
                               </NavLink>
                           </li>
                           <li>
                               <NavLink
                                   onClick={()=>{dispatch(setIsMenuActiveAC(false))}}
                                   to={auth.isAuth?"/Tanks/enteredFuel":"/"}
                                   className={style.act}
                               >Прием топлива
                               </NavLink>
                           </li>
                           <li>
                               <NavLink
                                   onClick={()=>{dispatch(setIsMenuActiveAC(false))}}
                                   to={auth.isAuth?"/Tanks/Invitarization":"/"}
                                   className={style.act}
                               >Инвентаризация
                               </NavLink>
                           </li>
                       </ul>
                   </li>
                   <li >
                       <NavLink to={auth.isAuth?"/Tanks":"/"}
                                className={({ isActive }) => (isActive ? `${style.act}` :'')}
                                >Емкостя
                       </NavLink>
                       <ul className={style.submenu}>
                           <li>
                               <NavLink
                                   onClick={()=>{dispatch(setIsMenuActiveAC(false))}}
                                   to={auth.isAuth?"/Tanks":"/"}
                                   className={style.act}
                               >Состояние
                               </NavLink>
                           </li>
                           <li>
                               <NavLink
                                   onClick={()=>{dispatch(setIsMenuActiveAC(false))}}
                                   to={auth.isAuth?"/Tanks/Sales":"/"}
                                   className={style.act}
                               >Отгрузки
                               </NavLink>
                           </li>
                           <li>
                               <NavLink
                                   onClick={()=>{dispatch(setIsMenuActiveAC(false))}}
                                   to={auth.isAuth?"/Tanks/enteredFuel":"/"}
                                   className={style.act}
                               >Прием топлива
                               </NavLink>
                           </li>
                           <li>
                               <NavLink
                                   onClick={()=>{dispatch(setIsMenuActiveAC(false))}}
                                   to={auth.isAuth?"/Tanks/Invitarization":"/"}
                                   className={style.act}
                               >Инвентаризация
                               </NavLink>
                           </li>
                       </ul>
                   </li>
               </ul>
           </nav>

       </div>
    )
}
export default Navigation;