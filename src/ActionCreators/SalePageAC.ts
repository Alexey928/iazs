import {AppThunkType} from "../State/reduxStore";
import {setIsRequestProcessingStatusAC} from "./authUserAC";
import {FuelReleasePageApi} from "../API/dalAPI";

export const salePageInitialState:salePageInitialStateType = {
    transaction: [],
    drivers: [],
}


 export type salePageInitialStateType = {
    transaction:Array<TransactionType>
    drivers:Array<DriverType>
}

//______________________Types for Data of Sales Page_______________________________
type TransactionType = {
    _id: number
    _date: string
    _type: number
    "_organization_id": number
    _driver_id: number
    _auto_id: number
    _azs_id:number
    _terminal_id: number|null,
    _tank_id: number,
    _pump_no: number,
    _cardA_id: number,
    _fuel_id: number,
    _temperature:string,
    _density: string,
    _volume: string,
    _volume15: string,
    _mass: string
}

type DriverType = {
    _id: number|null
    _name: string|null
    _note: string | null
}
//___________________________________________________________________________________

// Actions type ____________________________________________________________________
type setTransactionActionType = {
    type:"SET-TRANSACTION"
    payload:Array<TransactionType>
}
type setDriverActionType = {
    type:"SET-DRIVER"
    payload:Array<DriverType>
}
//___________________________________________________________________________________

export type salePageActionType = setTransactionActionType | setDriverActionType


//______________Action Creators_____________________________________________________
const setTransactionActionAC = (transactions:Array<TransactionType>):setTransactionActionType=>{
    return {type:"SET-TRANSACTION",payload:transactions}
}
const setDriverActionAC = (drivers:Array<DriverType>):setDriverActionType=>{
    return {type:"SET-DRIVER",payload:drivers}
}
//__________________________________________________________________________________

const setsalesPagedata = (token:string,date:string):AppThunkType => async (dispatch)=>{
    dispatch(setIsRequestProcessingStatusAC(true));
    try {
        const tronsaction = await FuelReleasePageApi.getTransactionList(token, date ,"1000");
        const drivers = await FuelReleasePageApi.getDriversList(token,"1000");


    } catch (e) {

    } finally {

    }
}
