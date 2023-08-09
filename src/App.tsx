import React, {useEffect} from 'react';
import './App.css';
import Header from "./components/Header/Header";
import Navigation from "./components/Navigation/Navigation";


import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

import {AppRootStateType, useAppDispatch} from "./State/reduxStore";

import Users from "./components/Users/Users";
import {followUnfollowAC, setCurentPageAC,} from "./ActionCreators/usersAC";


import LoginPage from "./components/Login/loginPage";
import Preloader from "./components/UIcomponets/generalPreloader/Preloader";
import {AppStateType, initializeAppTC} from "./ActionCreators/AppAC";
import {useSelector} from "react-redux";

import TanksPage from "./components/Tancs/TancsPage";

const App = ()=>{
    const dispatch = useAppDispatch();
    const AppState = useSelector<AppRootStateType,AppStateType>((state:AppRootStateType)=>state.App)

    useEffect(()=>{
        dispatch(initializeAppTC())
    },[dispatch])

   const followUnfolowUser = (usreID:string)=>{
        dispatch(followUnfollowAC(usreID))
   }



    const setCurentPage = (pageNumber:number)=>{
        dispatch(setCurentPageAC(pageNumber))
    }
    console.log("app is coled")
    if(!AppState.isInitialized){
        return(
            <div>
                <Preloader/>
           </div>)
    }
    return(
        <Router>
            <div className={"app-wraper"} >
                <Header />
                <Navigation/>
                <Routes>
                    <Route path={"/Login/*"} element={<LoginPage/>}/>
                    <Route  path = {"/"} element={<div>tttt</div>}/>
                    <Route  path = {"/Carts/*"} element={<div>ttt</div>}/>
                    <Route path = {"/DialogesPage/*"} element={<div>dddd</div>}/>
                    <Route path = {"/Users/*"} element={<Users
                                                               followUnfollowUser={followUnfolowUser}
                                                               setCurrentPage={setCurentPage}
                    />}/>
                    <Route path = {"/Tanks/*"} element={<TanksPage/>}/>
                </Routes>
            </div>
        </Router>
    )
}
export default App;
