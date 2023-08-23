import React from 'react';
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
    },
};

const TankChartPage = () => {
    const id  = useParams<'*'>();
    const tankId = id["*"] ;
    const tankPageState = useSelector<AppRootStateType,TanksPageStateType>(state => state.tanksPage);
    const labels = tankPageState.tanksDescriptions[tankId?tankId:"1"].map((el)=>el._date)
    const dispatch = useAppDispatch();
    const data = {
        labels,
        datasets: [
            {
                disabled:true,
                label: 'Level',
                data: tankPageState.tanksDescriptions[tankId?tankId:"1"].map(el=>el._fuelLevel),
                borderColor: 'rgb(11,110,0)',
                backgroundColor: 'rgba(35,232,4,0.5)',
            },
            {
                label: 'Temperature',
                data: tankPageState.tanksDescriptions[tankId?tankId:"1"].map(el=>el._temperature),
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
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
                <Line options={options} data={data} />
            </div>
        </div>
    );
};
export default TankChartPage;