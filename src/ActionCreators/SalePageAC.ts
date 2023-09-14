import {AppThunkType} from "../State/reduxStore";
import {setIsRequestProcessingStatusAC} from "./authUserAC";
import {FuelReleasePageApi} from "../API/dalAPI";
import {callbackDataType} from "../components/UIcomponets/Tabels/SimpleTAble";

export const salePageInitialState:salePageInitialStateType = {
    filteredTransaction:[],
    transaction: [],
    drivers: [],
    driversHash:{}
}


 export type salePageInitialStateType = {
    filteredTransaction:Array<{[key:string]:string|number|null}>
    transaction:Array<TransactionType>
    drivers:Array<DriverType>
    driversHash:driverHash
}

//______________________Types for Data of Sales Page_______________________________
 export type TransactionType = {
    _id: number
    _date: string
    _type: number
    "_organization_id": number
    _driver_id: number
    _auto_id: number|null
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
export type DriverType = {
    _id: number|string
    _name: string|null
    _note: string | null
}
export type driverHash = {
    [key:string]:DriverType
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
 type setDriverHashActionType = {
    type:"SET-DRIVER-HASH"
    payload:driverHash
}
type setFilteredTransactionActionType = {
    type:"SET-FILTERED-TRANSACTION",
    payload:Array<{[key:string]:string|number|null}>

}
//___________________________________________________________________________________

export type salePageActionType = setTransactionActionType | setDriverActionType | setDriverHashActionType | setFilteredTransactionActionType

//______________Action Creators_____________________________________________________


const setFilteredTrasactionAC = (transaction:Array<{[key:string]:string|number|null}>,filter:string[]|string,data:callbackDataType)=>{

    if(Array.isArray(filter)){
        const filteredValue = transaction.filter((el)=>{
            if(el[data.fieldOfFormickData]){
                debugger
            }
        })
    }

}

const setTransactionActionAC = (transactions:Array<TransactionType>):setTransactionActionType=>{
    return {type:"SET-TRANSACTION",payload:transactions}
}
const setDriversActionAC = (drivers:Array<DriverType>):setDriverActionType=>{
    return {type:"SET-DRIVER",payload:drivers}
}
const setDriversHashAC  = (hash:driverHash):setDriverHashActionType=>{
    return{type:"SET-DRIVER-HASH",payload:hash}
}

//__________________________________________________________________________________

export const setsalesPagedata = (token:string,date:string):AppThunkType => async (dispatch)=>{
    dispatch(setIsRequestProcessingStatusAC(true));
    try {
        const tronsaction = await FuelReleasePageApi.getTransactionList(token, date ,"1000");
        const drivers = await FuelReleasePageApi.getDriversList(token,"1000");
        console.log(tronsaction,drivers);
        const driverMap:driverHash = {};
        drivers.map((d)=>{
            driverMap[`${d._id}`] = d;
        });

        driverMap["uknown"] = {_id:"podonok",_name:"podonok",_note:"podonok"};

        dispatch(setDriversHashAC(driverMap))
        dispatch(setTransactionActionAC(tronsaction));
        dispatch(setDriversActionAC(drivers));
        setFilteredTrasactionAC(tronsaction,["55","55"],{value:"ме",hash:"driversHash",fieldOfHash:"_name",fieldOfFormickData:" _driver_id"})

    } catch (e) {
        console.log(e);
    } finally {
        dispatch(setIsRequestProcessingStatusAC(false));
    }
}
