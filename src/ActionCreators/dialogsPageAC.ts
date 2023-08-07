 export  type addDialogActionType = {
    type:"ADD_DIALOG"
    newDialog:string
};
export  type removeDialog = {
    type:"REMOVE_DIALOG"
    dialogID:string
}

export type updateEnteredDialogValueActionType = {
    type:"UPDATE_ENTERED_DIALOG"
    currentValue:string
}

export const addDialogAC = (newDialog:string):addDialogActionType=>{
    return   {type:"ADD_DIALOG",newDialog: newDialog};
}
export const remuveDialogAC = (dialogID:string):removeDialog=>{
    return {type:"REMOVE_DIALOG",dialogID}
}
export const updateEnteredDialogValueAC = (currentValue:string):updateEnteredDialogValueActionType=>{
    return{type:"UPDATE_ENTERED_DIALOG",currentValue}

}
