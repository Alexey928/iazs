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
import loginPage from "../../Login/loginPage";

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
const bindingInterface:{[key:string]:Array<bindingHashInterfaceItemType>} = {
    headers:[
        {
            name:"Дата",
            hash:"stationHash",// if we point to some state of this field. We are defining a hash for this column
            hashDataFieldName:"_name",
            data:"_azs_id",
            chooseFromRemaining:false,
            changeable:true,
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
            changeable:true,
            width:120,
        },
        {
            name:"АЗС",
            hash:"stationHash",
            hashDataFieldName:"_name",
            data:"_azs_id",
            chooseFromRemaining:false,
            changeable:false,
            width:120,
        },
        {
            name:"Продукт",
            hash:"",
            hashDataFieldName:"",
            data:"",
            chooseFromRemaining:false,
            changeable:false,
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
//______________________________________________________________________________________________________________________

const Sales = () => {
    const auth = useSelector<AppRootStateType,UserAuthStateType>(state => state.userAuth);
    const transaction = useSelector<AppRootStateType,Array<TransactionType>>(state => state.salesPage.transaction);
    const driversHash = useSelector<AppRootStateType,driverHash>(state => state.salesPage.driversHash);
    const stationHash = useSelector<AppRootStateType,stationHashType>(state => state.tanksPage.stationHash);
    const filteredTransaction = useSelector<AppRootStateType, Array<{[key:string]:string|number|null}>>(state=>state.salesPage.filteredTransaction);

    const dispatch = useAppDispatch();
    const getCalbackData = (Data:dateType,interfase:callbackDataType)=>{
        console.log("gggg")
        const [filteredId, data] = tableCallback(Data,interfase)
        console.log(filteredId);
        dispatch(setFilteredTrasactionAC(transaction,filteredTransaction,filteredId,data)) ;
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
                            formativeData={filteredTransaction}
                            hashForForigenKey={{
                                driverHash:driversHash,
                                stationHash:stationHash
                            }}
                            bindingHashInterfase = {bindingInterface}
                    />:
                    <Preloader/>
                }
            </div>
        </div>
    );
};

export default Sales;