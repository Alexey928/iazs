import {bindingHashInterfaceItemType} from "../../UIcomponets/Tabels/SimpleTAble";


export const bindingInterface:{[key:string]:Array<bindingHashInterfaceItemType>} = {
    headers:[
        {
            name:"Дата",// Header of column
            hash:"",// if we point to some state of this field. We are defining a hash for this column
            hashDataFieldName:"",//if we point to hash, then we MAST !! point this field
            data:"_date",// we must point this field olvays.
            chooseFromRemaining:false,
            totalValue:false,
            changeable:false,// if we don't have a hash, we can not change "tru/false - not worcked!!"- changable input is not working !!  in this area
            width:120,
            filteringMode:"HASH"
        },
        {
            name:"Путевой лист",
            hash:"",
            hashDataFieldName:"",
            data:"",
            chooseFromRemaining:false,
            totalValue:false,
            changeable:false,
            width:120,
            widhClue:false,//!!!!
            filteringMode:"HASH"
        },
        {
            name:"Организация",
            hash:"organisationHash",
            data:"_organization_id",
            hashDataFieldName:"_name",
            chooseFromRemaining:false,
            totalValue:false,
            changeable:true,
            width:120,
            filteringMode:"HASH"
        },
        {
            name:"Водитель",
            hash:"driverHash",
            hashDataFieldName:"_name",
            data:"_driver_id",
            chooseFromRemaining:true,
            totalValue:false,
            changeable:true,
            width:250,
            filteringMode:"HASH"

        },
        {
            name:"Авто",
            hash:"autoListHash",
            hashDataFieldName:"_gosnumber",
            data:"_auto_id",
            chooseFromRemaining:false,
            totalValue:false,
            changeable:true,
            width:120,
            filteringMode:"HASH"
        },
        {
            name:"АЗС",
            hash:"stationHash",
            hashDataFieldName:"_name",
            data:"_azs_id",
            chooseFromRemaining:true,
            totalValue:false,
            changeable:false,
            width:120,
            filteringMode:"HASH"
        },
        {
            name:"Продукт",
            hash:"fuelListHash",
            hashDataFieldName:"_name",
            data:"_fuel_id",
            chooseFromRemaining:false,
            totalValue:false,
            changeable:false,
            width:120,
            filteringMode:"HASH"
        },
        {
            name:"Рез-ар",
            hash:"tanksHashList",
            hashDataFieldName:"_name",
            data:"_tank_id",
            chooseFromRemaining:false,
            totalValue:false,
            changeable:true,
            width:120,
            filteringMode:"HASH"
        },
        {
            name:"Обьем",
            hash:"",
            hashDataFieldName:"",
            data:"_volume",
            chooseFromRemaining:false,
            totalValue:true,
            changeable:false,
            width:120,
            filteringMode:"HASH"
        },

    ],
}