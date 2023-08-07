import {addDialogActionType,removeDialog,updateEnteredDialogValueActionType} from "../ActionCreators/dialogsPageAC"
import {v1} from "uuid";

export type DialogsItemType = {
    id:string
    target:string
    userFirstName:string
    userLastName:string
    message:string
};
export type dialogsStateType = {
    enteredDialogValue:string,
    dialogs:Array<DialogsItemType>


}
export type dialogsActionType = addDialogActionType |
                  removeDialog |
                  updateEnteredDialogValueActionType;

const initialDialogState:dialogsStateType  ={enteredDialogValue:"",dialogs:[]};


export const dialogsReduser  = (state:dialogsStateType = initialDialogState, action:dialogsActionType):dialogsStateType=>{
    switch (action.type) {
        case "REMOVE_DIALOG":
            return {...state,dialogs:state.dialogs.filter((d)=>d.id!==action.dialogID)};
        case "UPDATE_ENTERED_DIALOG":
            return {...state,enteredDialogValue:action.currentValue}
        case "ADD_DIALOG":
            return {...state,dialogs:
                    [...state.dialogs,{id:v1(),userFirstName:"DIM",userLastName:"Dimith",message:action.newDialog,target:`${state.dialogs.length+1}`}]}
        default:
            return state
    }
}

