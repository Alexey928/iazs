import React from 'react';
import style from "./simpleSwotch.module.css"
type swithPropsType = {

}

const Swith = () => {
    return (
        <div className={style.contayner}>
            <input className={style.input} type="checkbox" id="switch"/>
            <label className={style.label} htmlFor="switch">Toggle</label>
        </div>
    );
};

export default Swith;