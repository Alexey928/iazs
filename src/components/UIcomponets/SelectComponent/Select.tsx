import React, { useEffect, useState, useRef } from 'react';
import style from "./select.module.css"

interface Option {
    value: string;
}

interface SelectProps {
    name: string;
    options: Option[];
    onSelect?: (selectedValue: string) => void;
}

const SelectComponent: React.FC<SelectProps> = ({ options, onSelect, name }) => {
    const [selectedOption, setSelectedOption] = useState('');
    const [active, setActive] = useState(false);
    const selectRef = useRef<HTMLDivElement | null>(null);// Ссылка на DOM-элемент селекта

    const handleSelectChange = (event: React.MouseEvent<HTMLLIElement>) => {
        setSelectedOption(event.currentTarget.innerText);
        setActive(!active);
    };

    useEffect(() => {
        selectedOption && onSelect && onSelect(selectedOption);
    }, [selectedOption]);

    useEffect(() => {
        // Добавляем обработчик события клика на документ
        const handleClickOutside = (event: MouseEvent) => {
            if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
                setActive(false); // Закрываем тело селекта, если клик был за его пределами
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <div ref={selectRef} className={style.select}>
            <header onClick={() => setActive(!active)} className={style.selectHeader}>
                <span className={style.currentSelect}>{!active && selectedOption ? selectedOption : name}</span>
                <div className={style.selectIcon} style={{ transform: !active ? "rotate(90deg)" : "rotate(270deg)" }}>
                    {"➤"}
                </div>
            </header>
            <ul className={active ? style.selectBodyActive : style.selectBody}>
                {options.map((option, i) => (
                    <li
                        key={i}
                        onClick={handleSelectChange}
                        className={selectedOption === option.value ? style.selectItemActive : style.selectItem}>
                        {option.value}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SelectComponent;
