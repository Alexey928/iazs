import React, {useEffect} from 'react';
import {AppRootStateType, useAppDispatch} from "../../../State/reduxStore";
import style from "../Tanks.module.css";
import {setIsMenuActiveAC} from "../../../ActionCreators/navigationMenuAC";
import Table, {bindingHashInterfaceItemType} from "../../UIcomponets/Tabels/SimpleTAble";
import SelectComponent from "../../UIcomponets/SelectComponent/Select";
import {driverHash, setsalesPagedata, TransactionType} from "../../../ActionCreators/SalePageAC";
import {useSelector} from "react-redux";
import {UserAuthStateType} from "../../../Resduscers/authUserReduser";
import {stationHashType} from "../../../ActionCreators/TanksPageAC";




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
];
const bindingInterfase:{[key:string]:Array<bindingHashInterfaceItemType>}  = {
    headers:[
        {
            name:"Дата",
            hash:"",
            hashDataFieldName:"",
            data:"_date",
            changeable:true,
            width:120,
        },
        {
            name:"Путевой лист",
            hash:"",
            hashDataFieldName:"",
            data:"",
            changeable:true,
            width:120,
        },
        {
            name:"Организация",
            hash:"stationHash",
            data:"",
            hashDataFieldName:"_name",
            changeable:true,
            width:120,
        },
        {
            name:"Водитель",
            hash:"stationHash",
            hashDataFieldName:"_name",
            data:"",
            changeable:true,
            width:120,
        },
        {
            name:"Авто",
            hash:"stationHash",
            hashDataFieldName:"_name",
            data:"",
            changeable:false,
            width:120,
        },
        {
            name:"АЗС",
            hash:"stationHash",
            hashDataFieldName:"_name",
            data:"",
            changeable:false,
            width:120,
        },
        {
            name:"Продукт",
            hash:"stationHash",
            hashDataFieldName:"_name",
            data:"",
            changeable:false,
            width:120,
        },
        {
            name:"Рез-ар",
            hash:"stationHash",
            hashDataFieldName:"_name",
            data:"",
            changeable:false,
            width:120,
        },
        {
            name:"Обьем",
            hash:"stationHash",
            hashDataFieldName:"_name",
            data:"",
            changeable:false,
            width:120,
        },

    ]
}

const Sales = () => {
    const auth = useSelector<AppRootStateType,UserAuthStateType>(state => state.userAuth);
    const transaction = useSelector<AppRootStateType,Array<TransactionType>>(state => state.salesPage.transaction);
    const driversHash = useSelector<AppRootStateType,driverHash>(state => state.salesPage.driversHash);
    const stationHash = useSelector<AppRootStateType,stationHashType>(state => state.tanksPage.stationHash)


    const dispatch = useAppDispatch();

    //структура которая связывает хеши с нужными полями образующего обекта и задает колбеки на их хедеры колонок,параметризируя их же
    //a structure that connects hashes with the necessary fields of the forming object and sets callbacks to their column headers, parameterizing them

    //_______________________________________________________

    useEffect(()=>{
        dispatch(setsalesPagedata(auth.data._token?auth.data._token:"","2020-01-31 02:00:20"));
    },[]);

    return (
        <div className={style.content} >
            <div className={style.contentHeader}>
                <span>Выдача топлива</span>
                <button  onClick={()=>dispatch(setIsMenuActiveAC())}>menu</button>
                <div style={{paddingLeft:10, display:"flex",zIndex:2,backgroundColor:'rgb(50,255,0)',
                            position:"absolute",left:0,right:0, top:30,height:60,
                            alignItems:"flex-start",justifyContent:"space-evenly",

                }}>
                    <SelectComponent options={options} name={"Продукт"}/>
                    <SelectComponent options={options1} name={"По АЗС"}/>
                </div>
            </div>

            <div className={style.contentWrapper}>
                <Table
                    formativeData={transaction}
                    hashForForigenKey={{
                        driverHash:driversHash,
                        stationHash:stationHash
                    }}
                    bindingHashInterfase = {bindingInterfase}/>
            </div>
        </div>
    );
};

export default Sales;