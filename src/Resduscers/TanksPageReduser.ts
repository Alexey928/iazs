import {tanksPageActionsType, TanksPageStateType} from "../ActionCreators/TanksPageAC";


export const TanksPageReduser =( state:TanksPageStateType, action:tanksPageActionsType):TanksPageStateType=>{
  switch (action.type) {
   case "SET-TANKS-STATE":
    return {...state,tanks:action.payload};
   case "SET-STATIONS-STATE":
    return {...state,stations:action.payload};
   case "SET-TANK-DESCRIPTIONS-STATE":
    return {...state,tanksDescriptions:action.payload}
   default:
    return state
  }
}