import React, { useState } from 'react';
import style from "./select.module.css"




interface Option {
    value: string;
    label: string;
}

interface SelectProps {
    name:string
    options: Option[];
    onSelect?: (selectedValue: string) => void;
}

const SelectComponent: React.FC<SelectProps> = ({ options, onSelect ,name}) => {
    const [selectedOption, setSelectedOption] = useState('');
    const [active ,setActive] = useState(false)

    const handleSelectChange = (event:React.MouseEvent<HTMLLIElement>) => {
        const selectedValue = event.currentTarget.innerText;
        setSelectedOption(selectedValue);
        if (onSelect) {
            onSelect(selectedValue);
        }
    };

    return (
        <div className={style.select}>
            <header onClick={()=>setActive(!active)} className={style.selectHeader}>
                <span className={style.currentSelect}>Прод</span>
                <div className={style.selectIcon}>{active ?"x":"o"}</div>
            </header>
            <ul className={active ? style.selectBodyActive : style.selectBody}>
                <li onClick={handleSelectChange} className={style.selectItem}>item1</li>
                <li className={style.selectItem}>item2</li>
                <li className={style.selectItem}>item3</li>
            </ul>

        </div>


);
};

export default SelectComponent;