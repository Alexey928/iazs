

export const  navigationStaete = {
    shoveIt: false as boolean|null
}

export const sestIsMenuActiveAC = (flag?:boolean)=>{
    console.log(flag)
    return{type:'SET_NAV_STATUS',flag:flag===false?flag:null} as const
}
