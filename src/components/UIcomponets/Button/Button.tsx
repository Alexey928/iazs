import React from 'react';
type buttonPropsType = {
    title:string
    defaultAction?:boolean
    onClick?:(payload?:any)=>void
    circle?:boolean
}
export const Button = (props:buttonPropsType) => {
    return (
        <button onClick={props.onClick?props.onClick:()=>console.log("click")}>{props.title}</button>
    );
};

