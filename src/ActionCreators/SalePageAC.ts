
export const salePageInitialState = {


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

type DriverList = {
    _id: number|null
    _name: string|null
    _note: string | null
}
//___________________________________________________________________________________



// Actions type ___________________________________________________________________

//___________________________________________________________________________________


//______________Action Creators_____________________________________________________

//__________________________________________________________________________________