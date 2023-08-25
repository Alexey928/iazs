
//_____________initial Data _________________________________________________________
import {AppThunkType} from "../State/reduxStore";
import {setIsRequestProcessingStatusAC} from "./authUserAC";
import {TanksPageAPI} from "../API/dalAPI";


const initDate:Date = new Date()

export const initialTankPageState:TanksPageStateType = {
    fuelList:[],
    stations:[],
    tanks:[],
    tanksDescriptions:{},
    startDate:`${initDate.getFullYear()}-${initDate.getMonth()}-${initDate.getDate()}
               ${initDate.getHours()}:${initDate.getMinutes()}:${initDate.getSeconds()}`,
    endDate:`${initDate.getFullYear()}-${initDate.getMonth()}-${initDate.getDate()}
               ${initDate.getHours()}:${initDate.getMinutes()}:${initDate.getSeconds()}`,
}

export type fuelListType = Array<{
    _id: number,
    _code:number,
    _name: string,
    _note:null|string,
}>

const InitialTank = {
    _id:null as number|null,
    _number: null as number|null,
    _name: null as string|null,
    _height:null as string|null,
    _capacity: null as string|null,
    _azs_id: null as number|null,
    _fuel_id: null as number|null,
}
const initialTankDescriptions = {
    _id:null as number|null,
    _date: null as string|null,
    _type: null as number|null,
    _auth: null as number|null,
    _tank_id: null as number|null,
    _fuel_id: null as number|null,
    _fuelLevel: null as string|null,
    _temperature: null as string|null,
    _density: null as string|null,
    _waterLevel:null as string|null,
    _waterVolume:null as string|null,
    _fuelVolume:null as string|null,
    _fuelVolume15: null as string|null,
    _fuelMass: null as string|null,
}

export const initialStationDescription = {
    _id:null as number|null,
    _name:null as string|null,
    _firm:null as string|null,
    _egrpou:null as number|null,
    _inn: null as string|null,
    _person_name: null as string|null,
    _person_inn: null as string|null,
    _person_post: null as string|null,
}
//_________________________________________________________________________________

//______________________Types for Data of Tanks Page_______________________________
export type TanksPageStateType = {
    stations:Array<StationsType>,
    tanks:Array<TankType>,
    tanksDescriptions:TanksDescriptionsTypes,
    fuelList:fuelListType
    startDate:string
    endDate:string
}


export type TankType = typeof InitialTank
export type TankDescriptionType = typeof initialTankDescriptions
export type StationsType = typeof initialStationDescription

 export type tanksType = Array<TankType>

export type TanksDescriptionsTypes = {
    [_tank_id:string]:Array<TankDescriptionType>
}
//_________________________________________________________________________________

//___________________________________ ActionTypes__________________________________
type setTanksActionType = {
    type:"SET-TANKS-STATE",
    payload:tanksType,
}
type setStationsActionType = {
    type:"SET-STATIONS-STATE"
    payload:Array<StationsType>
}

type setTanksDescriptionActionType = {
    type:"SET-TANK-DESCRIPTIONS-STATE",
    payload:TanksDescriptionsTypes,
}
type setStartDateActionType = {
    type:"SET-START-DATE"
    date:string
}
type setEndDateActionType = {
    type:"SET-END-DATE"
    date:string
}
type setFuelListActionType = {
    type:"SET-FUEL-LIST",
    fuelList:fuelListType

}
//_______________ActionCreators_________________________________________

export const setTanksAC = (tanks:Array<TankType>):setTanksActionType=>{
    return {type:"SET-TANKS-STATE",payload:tanks}
}
export const setDescriptionAC = (tanksDescription:TanksDescriptionsTypes):setTanksDescriptionActionType=>{
    return {type:"SET-TANK-DESCRIPTIONS-STATE",payload:tanksDescription}
}
export const setStationsAC = (stations:Array<StationsType>):setStationsActionType=>{
    return {type:"SET-STATIONS-STATE",payload:stations}
}
export const setStartDate = (date:string):setStartDateActionType=>{
    return {type:"SET-START-DATE",date}
}
export const setFuelList =(fuelList:fuelListType):setFuelListActionType=>{
    return{type:"SET-FUEL-LIST",fuelList}
}

export type tanksPageActionsType =  setTanksActionType|
                                    setTanksDescriptionActionType|
                                    setStartDateActionType|
                                    setStationsActionType|
                                    setFuelListActionType;

// ____________________Thanks as Redux Thunks Concept_________________________________________

export const setTankPageData  = (_token:string, date:string):AppThunkType=>{
    return async (dispatch)=>{
        dispatch(setIsRequestProcessingStatusAC(true));
        try {
            const station = await TanksPageAPI.getStations(_token);
            const tanks = await TanksPageAPI.getTanks(_token);
            const tanksDescription = await TanksPageAPI.getTanksDescription(_token,date,"1000");
            const fuelList = await TanksPageAPI.getFuelList(_token)

            const tempTanksDescription:TanksDescriptionsTypes = {}

            tanks.forEach((item,i)=>{
                tempTanksDescription[`${item._id}`] = tanksDescription.filter(i=>i._tank_id===item._id);
            });

            dispatch(setTanksAC(tanks));
            dispatch(setStationsAC(station));
            dispatch(setDescriptionAC(tempTanksDescription))
            dispatch(setFuelList(fuelList))
        }catch (e){
            console.log(e);
        }finally {
            dispatch(setIsRequestProcessingStatusAC(false));
        }

    }
}








