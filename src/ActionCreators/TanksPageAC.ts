
//_____________initial Data _________________________________________________________
import {AppThunkType} from "../State/reduxStore";
import {setIsRequestProcessingStatusAC} from "./authUserAC";
import {TanksPageAPI} from "../API/dalAPI";

const initDate:Date = new Date()

export const initialTankPageState:TanksPageStateType = {
    isFirstloading:false,
    autoHashList:{},
    tanks:[],
    tanksHash:{},
    stations:[],
    stationHash:{},
    organisationHasah:{},
    organisationList:[],
    fuelList:[],
    fuelListHash:{},
    tanksDescriptions:{},
    startDate:`${initDate.getFullYear()}-${initDate.getMonth()}-${initDate.getDate()}
               ${initDate.getHours()}:${initDate.getMinutes()}:${initDate.getSeconds()}`,
    endDate:`${initDate.getFullYear()}-${initDate.getMonth()}-${initDate.getDate()}
               ${initDate.getHours()}:${initDate.getMinutes()}:${initDate.getSeconds()}`,
}
export type fuelListItemType = {
    _id: number,
    _code:number,
    _name: string,
    _note:null|string,
}
export type fuelListType = Array<fuelListItemType>

export type AutoListType = {
    _id:   number,
    _gosnumber: string|null,//  "AX3140HB"
    _note: string|null//"Трактор БЕЛАРУС 1221.2,   15271BX (01185);   541-10104-0013",
    _organization_id: number|null,
    _model_id: number|null
}
export type OrganisationItemType = {
    _id:number,
    _name:string|null,
    _egrpou:string | null,
    _inn:string | null,
}
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
    isFirstloading:boolean
    autoHashList:autoListHashtype
    tanksHash:{[key:string]:TankType}
    stationHash:{[key:string]:StationType}
    stations:Array<StationType>,
    tanks:Array<TankType>,
    tanksDescriptions:TanksDescriptionsTypes,
    fuelList:fuelListType
    fuelListHash:{[key:string]:fuelListItemType}
    organisationList:OrganisationListType
    organisationHasah:OrganisationHashType
    startDate:string
    endDate:string
}
export type autoListHashtype = {[key:string]:AutoListType}
export type fuelListHashType = {[key:string]:fuelListItemType}
export type tankHashType = {[key:string]:TankType}
export type stationHashType = {[key:string]:StationType}

export type OrganisationListType = Array<OrganisationItemType>
export type OrganisationHashType = {[key:string]:OrganisationItemType}

export type TankType = typeof InitialTank
export type TankDescriptionType = typeof initialTankDescriptions
export type StationType = typeof initialStationDescription

export type tanksType = Array<TankType>

export type TanksDescriptionsTypes = {
    [_tank_id:string]:Array<TankDescriptionType>
}
//_________________________________________________________________________________

//___________________________________ ActionTypes__________________________________
type setHashStationActionType = {
    type:"SET-HASH-FOR-SATION",
    payload:{[key:string]:StationType}
}
type setHashTanksActionType = {
    type:"SET-HASH-FOR-TANKS"
    payload:{[key:string]:TankType}
}
type setHashFuelListType  = {
    type:"SET-HASH-FOR-FUEL-LIST"
    payload:{[key:string]:fuelListItemType}
}
type setOrganisationHashType = {
    type:"SET-HASH-ORGANISATION-LIST"
    payload:OrganisationHashType
}

type setAutoListHash = {
    type:"SET-HASH-FOR-AUTO-LIST",
    payload:{[key:string]:AutoListType}
}
type setTanksActionType = {
    type:"SET-TANKS-STATE",
    payload:tanksType,
}
type setStationsActionType = {
    type:"SET-STATIONS-STATE"
    payload:Array<StationType>
}
type setOrganisationActionType = {
    type:"SET-ORGANISATION-LIST"
    payload:OrganisationListType
}

type setTanksDescriptionsActionType = {
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
type setTankDescriptionActionType = {
    type:"SET-TANK-DESCRIPTION-SATE"
    payload:Array<TankDescriptionType>
}
type isFirstLoadingActionType = {
    type:""
}
//_______________ActionCreators_________________________________________
export const setIsFirstLoading = ()=>{

}

export const setTanksAC = (tanks:Array<TankType>):setTanksActionType=>{
    return {type:"SET-TANKS-STATE",payload:tanks}
}
export const setOrganisationAC = (organisations:OrganisationListType):setOrganisationActionType=>{
    return {type:"SET-ORGANISATION-LIST",payload:organisations}
}
export const setDescriptionsForTanksAC = (tanksDescription:TanksDescriptionsTypes):setTanksDescriptionsActionType=>{
    return {type:"SET-TANK-DESCRIPTIONS-STATE",payload:tanksDescription}
}
export const setStationsAC = (stations:Array<StationType>):setStationsActionType=>{
    return {type:"SET-STATIONS-STATE",payload:stations}
}
export const setOrganisationHashAC = (organisation:OrganisationHashType):setOrganisationHashType=>{
    return {type:"SET-HASH-ORGANISATION-LIST",payload:organisation}
}
export const setStationHashAC = (station:{[key:string]:StationType}):setHashStationActionType=>{
    return {type:"SET-HASH-FOR-SATION",payload:station}
}
export const setFuelListHashAC = (fuilhash:{[key:string]:fuelListItemType}):setHashFuelListType=>{
    return {type:"SET-HASH-FOR-FUEL-LIST",payload:fuilhash}
}
const setAutoListHash = (autoHash:{[key:string]:AutoListType}):setAutoListHash=>{
    return {type:"SET-HASH-FOR-AUTO-LIST",payload:autoHash}
}
const setHashOfTanksAC = (tanksHash:{[key:string]:TankType}):setHashTanksActionType=>{
    return {type:"SET-HASH-FOR-TANKS",payload:tanksHash}
}
export const setDescriptionForTank = (description:Array<TankDescriptionType>):setTankDescriptionActionType=>{
    return {type:"SET-TANK-DESCRIPTION-SATE",payload:description}
}
export const setStartDate = (date:string):setStartDateActionType=>{
    return {type:"SET-START-DATE",date}
}
export const setFuelList =(fuelList:fuelListType):setFuelListActionType=>{
    return{type:"SET-FUEL-LIST",fuelList}
}

export type tanksPageActionsType =  setTanksActionType|
                                    setTanksDescriptionsActionType|
                                    setStartDateActionType|
                                    setStationsActionType|
                                    setFuelListActionType|
                                    setHashTanksActionType|
                                    setHashStationActionType|
                                    setHashFuelListType|
                                    setAutoListHash|
                                    setOrganisationHashType|
                                    setOrganisationActionType

// ____________________Thanks as Redux Thunks Concept_________________________________________

const forArrToHash = <T extends {_id: number | null}>(arr:Array<T>):{[key:string]:T}=>{
    const temp:{[key:string]:T} = {};
    arr.forEach((e)=>{temp[`${e._id}`]=e})
    return temp
}
export const setTankPageData  = (_token:string, date:string):AppThunkType=>{
    return async (dispatch)=>{
        dispatch(setIsRequestProcessingStatusAC(true));
        try {
            const station = await TanksPageAPI.getStations(_token);
            const tanks = await TanksPageAPI.getTanks(_token);
            const tanksDescription = await TanksPageAPI.getTanksDescription(_token,date,"10000");
            const fuelList = await TanksPageAPI.getFuelList(_token);
            const autoList = await  TanksPageAPI.getAutoList(_token,"10000");
            const organisationLisst = await TanksPageAPI.getOrganisationList(_token);


            const tempTanksDescription:TanksDescriptionsTypes = {}
            const tanksHash = forArrToHash<TankType>(tanks);
            const stationsHash = forArrToHash<StationType>(station);
            const fuelListHash = forArrToHash<fuelListItemType>(fuelList);
            const autoListHash = forArrToHash<AutoListType>(autoList);
            const organisationHash = forArrToHash<OrganisationItemType>(organisationLisst);

            tanks.forEach((item)=>{
                tempTanksDescription[`${item._id}`] = tanksDescription.filter(i=>i._tank_id===item._id);
            });
            dispatch(setStationHashAC(stationsHash));
            dispatch(setTanksAC(tanks));
            dispatch(setStationsAC(station));
            dispatch(setDescriptionsForTanksAC(tempTanksDescription));
            dispatch(setFuelList(fuelList));
            dispatch(setFuelListHashAC(fuelListHash));
            dispatch(setHashOfTanksAC(tanksHash))
            dispatch(setAutoListHash(autoListHash));
            dispatch(setOrganisationHashAC(organisationHash));

        }catch (e){
            console.log(e);
        }finally {
            dispatch(setIsRequestProcessingStatusAC(false));
        }

    }
}








