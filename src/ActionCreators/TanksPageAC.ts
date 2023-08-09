
//_____________initial Data _________________________________________________________
const initDate:Date = new Date()

export const initialTankPageState:TanksPageStateType = {
    tanks:[],
    tanksDescriptions:{},
    startDate:`${initDate.getFullYear()}-${initDate.getMonth()}-${initDate.getDate()}
               ${initDate.getHours()}:${initDate.getMinutes()}:${initDate.getSeconds()}`,
    endDate:`${initDate.getFullYear()}-${initDate.getMonth()}-${initDate.getDate()}
               ${initDate.getHours()}:${initDate.getMinutes()}:${initDate.getSeconds()}`,
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
//_________________________________________________________________________________

//______________________Types for Data of Tanks Page_______________________________
export type TanksPageStateType = {
    tanks:Array<TankType>,
    tanksDescriptions:TanksDescriptionsTypes,
    startDate:string
    endDate:string
}
export type TankType = typeof InitialTank
export type TankDescriptionType = typeof initialTankDescriptions

type tanksType = Array<TankType>

type TanksDescriptionsTypes = {
    [_tank_id:string]:Array<TankDescriptionType>
}
//_________________________________________________________________________________

//___________________________________ ActionTypes__________________________________
type setTanksActionType = {
    type:"SET-TANKS-STATE",
    payload:tanksType,
}

type setTanksDescriptionActionType = {
    type:"SET-TANK-DESCRIPTIONS-STATE",
    payload:Array<TankDescriptionType>,
}
type setStartDateActionType = {
    type:"SET-START-DATE"
    date:string
}
type setEndDateActionType = {
    type:"SET-END-DATE"
    date:string
}
//_______________ActionCreators_________________________________________

export const setTanksAC = (tanks:Array<TankType>):setTanksActionType=>{
    return {type:"SET-TANKS-STATE",payload:tanks}
}
export const setDescriptionAC = (tanksDescription:Array<TankDescriptionType>):setTanksDescriptionActionType=>{
    return {type:"SET-TANK-DESCRIPTIONS-STATE",payload:tanksDescription}
}
export const setStartDate = (date:string):setStartDateActionType=>{
    return {type:"SET-START-DATE",date}
}
export const setEndDate = (date:string):setEndDateActionType=>{
    return {type:"SET-END-DATE",date}
}
// ____________________Thanks as Redux Thunks Concept_________________________________________

export const setTankPageData  = ()=>{

}








