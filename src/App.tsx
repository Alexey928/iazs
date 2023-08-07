import React, {useEffect} from 'react';
import './App.css';
import Header from "./components/Header/Header";
import Navigation from "./components/Navigation/Navigation";
import ProfilePage from "./components/ProfilePage/ProfilePage";
import DialogsPage from "./components/DialogsPage/DialogsPage";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

import {AppRootStateType, useAppDispatch} from "./State/reduxStore";
import {addPostAC, remuveNewPostAC, setProfileDataAC} from "./ActionCreators/profilePageAC"
import {addDialogAC, remuveDialogAC} from "./ActionCreators/dialogsPageAC"
import Users from "./components/Users/Users";
import {followUnfollowAC, setCurentPageAC,} from "./ActionCreators/usersAC";

import {profileDataType} from "./Resduscers/ProfileReducer";
import {setIsRequestProcessingStatusAC} from "./ActionCreators/authUserAC";
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
    //_______________________________profilePage calbaks______________________
    const addPost = (newPost:string)=>{
        dispatch(addPostAC(newPost));
    }
    const remuvePost =(postID:string)=>{
        dispatch(remuveNewPostAC(postID))
    }
    const setProfileData = (data:profileDataType)=>{
        dispatch(setProfileDataAC(data))
    }

    //_______________________________dialogPage colbacks_______________________
    const addDialog = (newDialog:string)=>{
        dispatch(addDialogAC(newDialog))
    }
   const removeDialog = (dialogID:string)=>{
        dispatch(remuveDialogAC(dialogID))
   }

   //___________________________________userPage colbacks________________________
   const followUnfolowUser = (usreID:string)=>{
        dispatch(followUnfollowAC(usreID))
   }
   // const setUsers = (users:Array<userType>)=>{ // виніс у санку
   //      dispatch(setUsersAC(users))
   // }
   const setComponentIsload = (flaf:boolean)=>{
        dispatch(setIsRequestProcessingStatusAC(flaf)) //setIsRequestProcessingStatusAC загальний AC
   }
   // const setUserTotalCount = (count:number)=>{//виніс у санку
   //      dispatch(setTotalUserCountAC(count))
   // }
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
                    <Route  path = {"/"} element={<ProfilePage
                                                        addPost={addPost}
                                                        removePost={remuvePost}
                                                        setProfileData={setProfileData}
                                                        setProfileIsLoad={setComponentIsload}

                        />
                    }/>
                    <Route  path = {"/Profile/*"} element={<ProfilePage
                                                              addPost={addPost}
                                                              removePost={remuvePost}
                                                              setProfileData={setProfileData}
                                                              setProfileIsLoad={setComponentIsload}

                        />
                    }/>
                    <Route path = {"/DialogesPage/*"} element={<DialogsPage addDialog={addDialog}
                                                                            removeDialog={removeDialog}
                    />
                    }/>
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
