import React, {useState} from 'react';
import style from "../Tancs/Tanks.module.css";
import {setIsMenuActiveAC} from "../../ActionCreators/navigationMenuAC";
import {AppRootStateType, useAppDispatch} from "../../State/reduxStore";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import {useSelector} from "react-redux";
import {TanksPageStateType} from "../../ActionCreators/TanksPageAC";
import {useParams} from "react-router-dom";
import {siftingArray} from "../../AuxiliaryLogic/SomeLogicForRenderedData";


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            color:"rgb(33,255,0)",
            display: true,
            text: 'Температура / Уровень',
        },
        scales: {
            y: {
                beginAtZero: true, // Настройки первой шкалы
                position: 'left',
                id: 'y-axis-1',
            },
            y2: {
                beginAtZero: true, // Настройки второй шкалы
                position: 'right',
                id: 'y-axis-2',
            },
        },
    },
};

const TankChartPage = () => {
    const id  = useParams<'*'>();
    const tankId = id["*"] ;
    const tankPageState = useSelector<AppRootStateType,TanksPageStateType>(state => state.tanksPage);
    const labels = siftingArray(tankPageState.tanksDescriptions[tankId?tankId:"1"].map((el)=>el._date));
    const dispatch = useAppDispatch();
    const [wiueWidth, setWiueWidth] = useState(0);
    const [flag,setFlag] = useState(true);
        //__________Logic for adaptation Chart ______________________________________
    // useEffect(() => {
    //     const handleOrientationChange = () => {
    //         setWiueWidth(window.innerWidth);
    //     };
    //     window.addEventListener('resize', handleOrientationChange);
    //     return () => {
    //         window.removeEventListener('resize', handleOrientationChange);
    //     };
    // }, []);
    //
    // useEffect(()=>{
    //     wiueWidth!==0 && setFlag(false)
    // },[wiueWidth]);
    //
    // useEffect(()=>{
    //     !flag && setFlag(true)
    // },[flag])
//________________________________________________________________________________________
    const data = {
        labels,
        datasets: [
            {
                yAxisID: 'y-axis-1',
                label: 'Level',
                data:siftingArray(tankPageState.tanksDescriptions[tankId?tankId:"1"].map(el=>el._fuelLevel)),
                borderColor: 'rgb(20,185,1)',
                backgroundColor: 'rgba(35,232,4,0.69)',
                pointHoverBackgroundColor: 'rgb(255, 0, 0)',
            },
            {
                yAxisID: 'y-axis-2',
                label: 'Temperature',
                data: siftingArray(tankPageState.tanksDescriptions[tankId?tankId:"1"].map(el=>el._temperature)),
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
                pointHoverBackgroundColor: 'rgb(255, 0, 0)',
                hidden: true,
            },
        ],
    };
    return(
        <div className={style.content} >
            <div className={style.contentHeader}>
                <span>История сосотояния</span>
                <button  onClick={()=>dispatch(setIsMenuActiveAC())}>menu</button>
            </div>
            <div className={style.contentWrapper}>
                <div style={{width:"100%",backgroundColor:'rgb(50,255,0)',textAlign:"center"}}>{`Емкость №${tankId}`}</div>
                {flag && <Line options={options} data={data} />}
            </div>
        </div>
    );
};
export default TankChartPage;