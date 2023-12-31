import {AppThunkType} from "../State/reduxStore";
import {setIsRequestProcessingStatusAC} from "./authUserAC";
import {FuelReleasePageApi} from "../API/dalAPI";
const LIMIT = "10000"

export const salePageInitialState:salePageInitialStateType = {
    isFirstloading:false,
    filteredTransaction:[],
    transaction: [],
    drivers: [],
    driversHash:{}
}

export type filteredTransactionType = Array<{[key:string]:string|number|null}>
 export type salePageInitialStateType = {
    isFirstloading:boolean
    transaction:Array<TransactionType>
    filteredTransaction:filteredTransactionType
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
type isFirstLoadingActionType = {
    type:"SET-FLAG-OF-FIRST-LOAD/Sale/Page"
    flag:boolean
}

//___________________________________________________________________________________

export type salePageActionType = setTransactionActionType |
                                setDriverActionType |
                                setDriverHashActionType |
                                setFilteredTransactionActionType|
                                isFirstLoadingActionType

//______________Action Creators_____________________________________________________
export const setFilteredTransactionUsedFilteredMode = (transaction:Array<{[key:string]:string|number|null}>,
                                                       filteredTransaction:Array<{[key:string]:string|number|null}>,
                                                       filteredLinks:Array<{[key:string]:string|number|null}>,
                                                       )=>{
   return {type:"SET-FILTERED-TRANSACTION",payload:[...filteredLinks]}
}

export const setFilteredTrasactionAC = (transaction:Array<{[key:string]:string|number|null}>,
                                        filteredTransaction:Array<{[key:string]:string|number|null}>,
                                        filter:string[]|string,
                                        fieldOfFormickData:string,
                                        chooseFromRemaining:boolean,
):setFilteredTransactionActionType => {
    if(Array.isArray(filter)){
        const curentData = chooseFromRemaining?[...filteredTransaction]:[...transaction];
        if(filter.length===0) return {type:"SET-FILTERED-TRANSACTION",payload:curentData}
        const filteredValue = curentData.filter((el)=>{
            const filtrableData = el[fieldOfFormickData];
            if(filtrableData){
                let flag = false;
                filter.forEach((el) => {
                    if(el === filtrableData.toString()) flag=true
                })
                if(flag){
                 return true
                }
            }
            return false
        })
        console.log(filteredValue)
        return {type:"SET-FILTERED-TRANSACTION",payload:filteredValue}
    }
    return {type:"SET-FILTERED-TRANSACTION",payload:[]}
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
export const setIsFirstLoading = (flag:boolean):isFirstLoadingActionType=>{
    return {type:"SET-FLAG-OF-FIRST-LOAD/Sale/Page",flag}
}
//__________________________________________________________________________________
//tsanck creators

export const setSalesPageData = (token:string, dateFrom:string):AppThunkType => async (dispatch)=>{
    dispatch(setIsRequestProcessingStatusAC(true));
    try {
        const transaction = await FuelReleasePageApi.getTransactionList(token, "",dateFrom ,LIMIT);
        const drivers = await FuelReleasePageApi.getDriversList(token,"1000");
        const driverMap:driverHash = {};
        drivers.map((d)=>{
            driverMap[`${d._id}`] = d;
        });
        driverMap["uknown"] = {_id:"PODONOK",_name:"PODONOK",_note:"PODONOK"};
        dispatch(setDriversHashAC(driverMap))
        dispatch(setTransactionActionAC(transaction));
        dispatch(setDriversActionAC(drivers));
        dispatch(setFilteredTrasactionAC(transaction,[],[],"",false));
        dispatch(setIsFirstLoading(true))
    } catch (e) {
        console.log(e);
    } finally {
        dispatch(setIsRequestProcessingStatusAC(false));
    }
}

export const setTransactionInTimeRange = (token:string, dateFrom:string, dateToo:string):AppThunkType => async (dispatch)=>{
    dispatch(setIsRequestProcessingStatusAC(true));
    try{
        const transaction = await FuelReleasePageApi.getTransactionList(token, dateFrom ,dateToo,LIMIT);
        dispatch(setTransactionActionAC(transaction));
        dispatch(setFilteredTrasactionAC(transaction,[],[],"",false));
    }catch (e){
        console.log(e);
    }finally {
        dispatch(setIsRequestProcessingStatusAC(false));
    }

}
