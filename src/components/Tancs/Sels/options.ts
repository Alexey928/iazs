import {bindingHashInterfaceItemType} from "../../UIcomponets/Tabels/SimpleTAble";

export const bindingInterface:{[key:string]:Array<bindingHashInterfaceItemType>} = {
    headers:[
        {
            name:"Дата",// Header of column
            hash:"",// if we point to some state of this field. We are defining a hash for this column
            hashDataFieldName:"",//if we point to hash, then we MAST !! point this field
            data:"_date",// we must point this field olvays.
            chooseFromRemaining:false,
            changeable:true,// if we don't have a hash, we can not change "tru/false - not worcked!!"- changable input is not working !!  in this area
            width:120,
        },
        {
            name:"Путевой лист",
            hash:"",
            hashDataFieldName:"",
            data:"",
            chooseFromRemaining:false,
            changeable:false,
            width:120,
        },
        {
            name:"Организация",
            hash:"",
            data:"_organization_id",
            hashDataFieldName:"",
            chooseFromRemaining:false,
            changeable:false,
            width:120,
        },
        {
            name:"Водитель",
            hash:"driverHash",
            hashDataFieldName:"_name",
            data:"_driver_id",
            chooseFromRemaining:false,
            changeable:true,
            width:120,
        },
        {
            name:"Авто",
            hash:"",
            hashDataFieldName:"",
            data:"_auto_id",
            chooseFromRemaining:false,
            changeable:false,
            width:120,
        },
        {
            name:"АЗС",
            hash:"stationHash",
            hashDataFieldName:"_name",
            data:"_azs_id",
            chooseFromRemaining:false,
            changeable:true,
            width:120,
        },
        {
            name:"Продукт",
            hash:"fuelListHash",
            hashDataFieldName:"_name",
            data:"_fuel_id",
            chooseFromRemaining:false,
            changeable:true,
            width:120,
        },
        {
            name:"Рез-ар",
            hash:"",
            hashDataFieldName:"",
            data:"",
            chooseFromRemaining:false,
            changeable:false,
            width:120,
        },
        {
            name:"Обьем",
            hash:"",
            hashDataFieldName:"",
            data:"_volume",
            chooseFromRemaining:false,
            changeable:false,
            width:120,
        },

    ],
}