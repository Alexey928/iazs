import React from 'react';
import style from "./Nawigation.module.css"
import {NavLink, useLocation} from "react-router-dom";
import {AppRootStateType, useAppDispatch} from "../../State/reduxStore";
import {useSelector} from "react-redux";
import {navigationStateType} from "../../Resduscers/navigationMenuReduser";
import {sestIsMenuActiveAC} from "../../ActionCreators/navigationMenuAC";


const Navigation = ()=>{
    //const location  = useLocation()//<---- interesting object ))

    const navigationState = useSelector<AppRootStateType,navigationStateType>(state => state.navigation);
    const dispatch = useAppDispatch();

    return (
       <div className={style.navigationWrapper}>
           <nav className={navigationState.shoveIt?`${style.navigation} ${style.navigationSelected}`:style.navigation}>
               <ul className={style.menu}>
                   <li>
                       <NavLink to={"/Carts"}   className={({ isActive }) => (isActive ? `${style.active} ${style.act}` :'')}>Карты</NavLink>
                   </li>
                   <li>
                       <NavLink to={"/DialogesPage"}  className={({ isActive }) => (isActive ? `${style.active} ${style.act}` :'')}>Операции</NavLink>
                   </li>
                   <li >
                       <ul className={style.submenu}>
                           <li>
                               <NavLink
                                   onClick={()=>{dispatch(sestIsMenuActiveAC(false))}}
                                   to={"/ReferencePage"}
                                   className={style.act}
                                   >Организации
                               </NavLink>
                           </li>
                           <li>
                               <NavLink
                                   onClick={()=>{dispatch(sestIsMenuActiveAC(false))}}
                                   to={"/ReferencePage/supplier/"}
                                   className={style.act}
                                   >Поставшики
                               </NavLink>
                           </li>
                           <li>
                               <NavLink
                                   onClick={()=>{dispatch(sestIsMenuActiveAC(false))}}
                                   to={"/ReferencePage/drivers/"}
                                   className={style.act}
                               >Водители
                               </NavLink>
                           </li>
                           <li>
                               <NavLink
                                   onClick={()=>{dispatch(sestIsMenuActiveAC(false))}}
                                   to={"/ReferencePage/AutoModels"}
                                   className={style.act}
                               >Модели авто
                               </NavLink>
                           </li>
                           <li>
                               <NavLink
                                   onClick={()=>{dispatch(sestIsMenuActiveAC(false))}}
                                   to={"/ReferencePage/cars"}
                                   className={style.act}
                               >Автомобили
                               </NavLink>
                           </li>
                       </ul>
                       <NavLink to={"/ReferencePage"}
                                className={({ isActive }) => (isActive ? `${style.active} ${style.act}` :'')}
                       >Справочники
                       </NavLink>
                   </li>
                   <li>
                       <NavLink to={"/Music"}
                                onClick={()=>{dispatch(sestIsMenuActiveAC(false))}}
                                className={({ isActive }) => (isActive ? `${style.act}` :'')}
                                >Отчеты
                       </NavLink>
                   </li>
                   <li >
                       <NavLink to={"/Tanks"}
                                className={({ isActive }) => (isActive ? `${style.act}` :'')}
                                >Емкостя
                       </NavLink>
                       <ul className={style.submenu}>
                           <li>
                               <NavLink
                                   onClick={()=>{dispatch(sestIsMenuActiveAC(false))}}
                                   to={"/Tanks"}
                                   className={style.act}
                               >Состояние
                               </NavLink>
                           </li>
                           <li>
                               <NavLink
                                   onClick={()=>{dispatch(sestIsMenuActiveAC(false))}}
                                   to={"/Tanks/sales"}
                                   className={style.act}
                               >Отгрузки
                               </NavLink>
                           </li>
                           <li>
                               <NavLink
                                   onClick={()=>{dispatch(sestIsMenuActiveAC(false))}}
                                   to={"/Tanks/enteredFuel"}
                                   className={style.act}
                               >Прием топлива
                               </NavLink>
                           </li>
                           <li>
                               <NavLink
                                   onClick={()=>{dispatch(sestIsMenuActiveAC(false))}}
                                   to={"/Tanks"}
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