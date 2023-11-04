import {bindingHashInterfaceItemType} from "../UIcomponets/Tabels/SimpleTAble";

export const bindingHashInterface:{[key:string]:Array<bindingHashInterfaceItemType>} = {
    headers:[
    {
        name:"Организация",// Header of column
        hash:"",// if we point to some state of this field. We are defining a hash for this column
        hashDataFieldName:"",//if we point to hash, then we MAST !! point this field
        data:"_name",// we must point this field olvays.
        chooseFromRemaining:false,
        totalValue:false,
        changeable:true,// if we don't have a hash, we can not change "tru/false - not worcked!!"- changable input is not working !!  in this area
        width:180,
        filteringMode:"ARAY",
    },
    {
        name:"ИНН",
        hash:"",
        hashDataFieldName:"",
        data:"_inn",
        chooseFromRemaining:false,
        totalValue:false,
        changeable:false,
        width:120,
        filteringMode:"HASH"
    },
    {
        name:"Примечание",
        hash:"",
        hashDataFieldName:"",
        data:"_egrpou",
        chooseFromRemaining:false,
        totalValue:false,
        changeable:false,
        width:800,
        filteringMode:"HASH"
    },

]}