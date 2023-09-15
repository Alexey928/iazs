import React, {useEffect} from 'react';
import {AppRootStateType, useAppDispatch} from "../../../State/reduxStore";
import style from "../Tanks.module.css";
import {setIsMenuActiveAC} from "../../../ActionCreators/navigationMenuAC";
import Table, {
    bindingHashInterfaceItemType,
    callbackDataType,
    dateType,
    tableCallback
} from "../../UIcomponets/Tabels/SimpleTAble";
import SelectComponent from "../../UIcomponets/SelectComponent/Select";
import {
    driverHash,
    setFilteredTrasactionAC,
    setsalesPagedata,
    TransactionType
} from "../../../ActionCreators/SalePageAC";
import {useSelector} from "react-redux";
import {UserAuthStateType} from "../../../Resduscers/authUserReduser";
import {stationHashType} from "../../../ActionCreators/TanksPageAC";
import Preloader from "../../UIcomponets/generalPreloader/Preloader";

const options = [
    { value: 'Дт'},
    { value: 'А92'},
    { value: 'А95'},
    { value: 'А98'},
];
const options1 = [
    { value: 'АЗС-1'},
    { value: 'АЗС-2'},
    { value: 'АЗС-3'},
    { value: 'АЗС-4'},
]

//a structure that connects hashes with the necessary fields of the forming object and sets callbacks to their column headers, parameterizing them
const bindingInterfase:{[key:string]:Array<bindingHashInterfaceItemType>} = {
    headers:[
        {
            name:"Дата",
            hash:"stationHash",
            hashDataFieldName:"_name",
            fieldFromHash:"_azs_id",
            data:"_azs_id",
            changeable:true,
            width:120,
        },
        {
            name:"Путевой лист",
            hash:"",
            hashDataFieldName:"",
            fieldFromHash:"",
            data:"",
            changeable:false,
            width:120,
        },
        {
            name:"Организация",
            hash:"",
            data:"_organization_id",
            hashDataFieldName:"",
            fieldFromHash:"",
            changeable:false,
            width:120,
        },
        {
            name:"Водитель",
            hash:"driverHash",
            hashDataFieldName:"_name",
            fieldFromHash:"_driver_id",
            data:"_driver_id",
            changeable:true,
            width:120,
        },
        {
            name:"Авто",
            hash:"",
            hashDataFieldName:"",
            fieldFromHash:"",
            data:"_auto_id",
            changeable:true,
            width:120,
        },
        {
            name:"АЗС",
            hash:"stationHash",
            hashDataFieldName:"_name",
            fieldFromHash:"_azs_id",
            data:"_azs_id",
            changeable:false,
            width:120,
        },
        {
            name:"Продукт",
            hash:"",
            hashDataFieldName:"",
            fieldFromHash:"",
            data:"",
            changeable:false,
            width:120,
        },
        {
            name:"Рез-ар",
            hash:"",
            hashDataFieldName:"",
            fieldFromHash:"",
            data:"",
            changeable:false,
            width:120,
        },
        {
            name:"Обьем",
            hash:"",
            hashDataFieldName:"",
            fieldFromHash:"",
            data:"_volume",
            changeable:false,
            width:120,
        },

    ],
}
//______________________________________________________________________________________________________________________

const Sales = () => {
    const auth = useSelector<AppRootStateType,UserAuthStateType>(state => state.userAuth);
    const transaction = useSelector<AppRootStateType,Array<TransactionType>>(state => state.salesPage.transaction);
    const driversHash = useSelector<AppRootStateType,driverHash>(state => state.salesPage.driversHash);
    const stationHash = useSelector<AppRootStateType,stationHashType>(state => state.tanksPage.stationHash)

    const dispatch = useAppDispatch();

    const getCalbackData = (Data:dateType,interfase:callbackDataType)=>{
        const [filteredId, data] = tableCallback(Data,interfase)
        dispatch(setFilteredTrasactionAC(transaction,filteredId,data)) ;
    }

    useEffect(()=>{
        dispatch(setsalesPagedata(auth.data._token?auth.data._token:"","2020-01-30 02:00:20"));
    },[]);

    return (
        <div className={style.content} >
            <div className={style.contentHeader}>
                <span>Выдача топлива</span>
                <button  onClick={()=>dispatch(setIsMenuActiveAC())}>menu</button>
                <div style={{paddingLeft:10, display:"flex", zIndex:2, backgroundColor:'rgb(50,255,0)',
                            position:"absolute",left:0,right:0, top:30,height:60,
                            alignItems:"center",justifyContent:"space-evenly",
                }}>
                    <SelectComponent options={options} name={"Продукт"}/>
                    <SelectComponent options={options1} name={"По АЗС"}/>
                </div>
            </div>

            <div className={style.contentWrapper}>
                {
                    !auth.isLading ?
                    <Table
                            callback={getCalbackData}
                            formativeData={transaction}
                            hashForForigenKey={{
                                driverHash:driversHash,
                                stationHash:stationHash
                            }}
                            bindingHashInterfase = {bindingInterfase}
                    />:
                    <Preloader/>
                }
            </div>
        </div>
    );
};

export default Sales;