import React from 'react';
import style from "./dialogs.module.css"
import DialigsItem from "./DialogsItem/DialigsItem";
import {DialogsItemType, dialogsStateType} from "../../Resduscers/dialogsReduser";
import AddItemForm from "../UIcomponets/AddItemForm/AddItemForm";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../State/reduxStore";



type DialogsPagePropstype = {

    addDialog:(nevDialog:string)=>void
    removeDialog:(dialogID:string)=>void

}

const DialogsPage = (props:DialogsPagePropstype) => {
    const dialogsPage = useSelector<AppRootStateType,dialogsStateType>(state => state.dialogsPage)
    return (
        <div className={style.dialogsContent}>
            <AddItemForm addItem={props.addDialog}/>
            <div style={{height:"90vh",overflow:"scroll"}}>
                {dialogsPage.dialogs.map((elem)=><DialigsItem
                      removeDialog={()=>props.removeDialog(elem.id)}
                      target={elem.target}
                      key={elem.id}
                      mesege = {elem.message}
                      user={elem.userFirstName}/>)}

            </div>
        </div>
    );
};

export default DialogsPage;