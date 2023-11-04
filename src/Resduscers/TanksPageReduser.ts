import {initialTankPageState, tanksPageActionsType, TanksPageStateType} from "../ActionCreators/TanksPageAC";


export const TanksPageReduser =(state:TanksPageStateType = initialTankPageState, action:tanksPageActionsType):TanksPageStateType=>{
  switch (action.type) {
       case "SET-TANKS-STATE":
        return {...state,tanks:action.payload};
       case "SET-STATIONS-STATE":
        return {...state,stations:action.payload};
       case "SET-TANK-DESCRIPTIONS-STATE":
        return {...state,tanksDescriptions:action.payload};
       case "SET-FUEL-LIST":
        return {...state,fuelList:action.fuelList};
       case "SET-HASH-FOR-SATION":
        return {...state,stationHash:action.payload};
       case "SET-HASH-FOR-FUEL-LIST":
        return {...state,fuelListHash:action.payload};
       case "SET-HASH-FOR-AUTO-LIST":
        return {...state,autoHashList:action.payload}
       case "SET-HASH-FOR-TANKS":
        return {...state,tanksHash:action.payload}
       case "SET-HASH-ORGANISATION-LIST":
        return {...state,organisationHasah:action.payload}
      case "SET-ORGANISATION-LIST":
          return {...state, organisationList:action.payload}
      case "SET-FLAG-OF-FIRST-LOAD":
          return {...state, isFirstloading:action.flag}
      case "SET-FILTERED-ORGANISATION-LIST":
          return {...state,filteredOrganisationList:[...action.payload]}
      default:
        return state
  }
};