import React, {useEffect} from 'react';
import './App.css';
import Header from "./components/Header/Header";
import Navigation from "./components/Navigation/Navigation";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {AppRootStateType, useAppDispatch} from "./State/reduxStore";
import {followUnfollowAC, setCurentPageAC,} from "./ActionCreators/usersAC";
import LoginPage from "./components/Login/loginPage";
import Preloader from "./components/UIcomponets/generalPreloader/Preloader";
import {AppStateType, initializeAppTC} from "./ActionCreators/AppAC";
import {useSelector} from "react-redux";
import TanksPage from "./components/Tancs/TancsPage";
import Reference from "./components/ReferencePage/Reference";
import Supplier from "./components/ReferencePage/Supplier/Supplier";
import Drivers from "./components/ReferencePage/Drivers/Drivers";
import AutoModels from "./components/ReferencePage/AutoModels/AutoModels";
import Cars from "./components/ReferencePage/Cars/Cars";
import EnteredFuel from "./components/Tancs/EntertdFuel/EnteredFuel";
import Sales from "./components/Tancs/Sels/Sales";
import Invitarization from "./components/Tancs/Invitarization/Invitarization";
import Operation from "./components/Operation/Operation";
import Carts from "./components/Carts/Carts";
import {UserAuthStateType} from "./Resduscers/authUserReduser";
import TankChartPage from "./components/TankChartPage/TankChartPage";

const App = ()=>{
    const dispatch = useAppDispatch();
    const AppState = useSelector<AppRootStateType,AppStateType>((state:AppRootStateType)=>state.App)

    useEffect(()=>{
        dispatch(initializeAppTC())
    },[dispatch])

    console.log("app is coled");

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
                    <Route  path = {"/"} element={<LoginPage/>}/>
                    <Route  path = {"/TankChartPage/*"} element={<TankChartPage/>}/>
                    <Route  path = {"/Carts/*"} element={<Carts/>}/>
                    <Route path = {"/Operation/*"} element={<Operation/>}/>
                    <Route path = {"/ReferencePage/"} element={<Reference/>}/>
                    <Route path = {"/ReferencePage/supplier/"} element={<Supplier/>}/>
                    <Route path = {"/ReferencePage/drivers/"} element={<Drivers/>}/>
                    <Route path = {"/ReferencePage/AutoModels/"} element={<AutoModels/>}/>
                    <Route path = {"/ReferencePage/AutoModels/"} element={<AutoModels/>}/>
                    <Route path = {"/ReferencePage/cars/"} element={<Cars/>}/>
                    <Route path = {"/Tanks/*"} element={<TanksPage/>}/>
                    <Route path = {"/Tanks/enteredFuel"} element={<EnteredFuel/>}/>
                    <Route path = {"/Tanks/Sales"} element={<Sales/>}/>
                    <Route path = {"/Tanks/Invitarization"} element={<Invitarization/>}/>
                </Routes>
            </div>
        </Router>
    )
}
export default App;
