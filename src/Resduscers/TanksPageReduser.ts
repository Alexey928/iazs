import {tanksPageActionsType, TanksPageStateType} from "../ActionCreators/TanksPageAC";


export const TanksPageReduser =( state:TanksPageStateType, action:tanksPageActionsType):TanksPageStateType=>{
switch (action.type) {
 case "SET-TANKS-STATE":
  return {...state,tanks:action.payload};
  case ""
}

 }