import React, {KeyboardEvent, ChangeEvent, useState, useEffect} from 'react';
import style from "./editinebalSpan.module.css";
import {configurateClue, useDebounce} from './hooc/useDebouns'


type EditableSpanPropsType = {
    hasName?:string
    widthClue?:boolean
    hash?:{[p: string]: {[p: string]: string | number | null}}
    mutable:boolean
    title: string
    type:"password"|"text"
    handler?:(value:string)=>void
    placeholder?:string
    lang?:"ru"|"en"|"es"
}

export function detectLanguage(string: string):string {
    const englishChars = /[a-zA-Z]/;
    const spanishChars = /[áéíóúñ]/;
    const russianChars = /[а-яА-ЯЁё]/;

    let englishCount = 0;
    let ruCount = 0;
    let spanishCount = 0;

    for (const char of string) {
        if (englishChars.test(char)) {
            englishCount++;
        } else if (russianChars.test(char)) {
            ruCount++;
        } else if (spanishChars.test(char)) {
            spanishCount++;
        }
    }

    if (englishCount > ruCount && englishCount > spanishCount) {
        console.log("en")
        return "en";
    } else if (ruCount > englishCount && ruCount > spanishCount) {
        console.log("ru")
        return "ru";
    } else if (spanishCount > englishCount && spanishCount > ruCount) {
        console.log("es")
        return "es";
    } else {
        // Если ни один язык не преобладает, вернем "unknown"
        console.log("unknown")
        return "unknown";
    }
}

export function RegularEditableSpan(props:EditableSpanPropsType){
    const [editMode, setEditMode] = useState<boolean>(false);
    const [title, setTitle] = useState<string>("");
    const [clue,setClue] = useState<Array<string>>([]);
    let [langError , setLangErr] = useState<string>("");
    let [isTitle , setIsTitle] = useState<boolean>(false);

    const debouncedValue = useDebounce<string>(title, 500);

    console.log(title+"<---")

    const activateEditMode = () => {
        setEditMode(true);
    }

    const activateViewMode = () => {
        setEditMode(false);
        props.handler && title && props.handler(title)
    }

    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        if(props.lang){
            const lang = detectLanguage(e.currentTarget.value);
            lang === props.lang && setTitle(e.currentTarget.value);
            lang==="unknown" && setTitle("")
            lang !== props.lang && setLangErr(props.lang)
            title&&setIsTitle(true);
        }else{
            setTitle(e.currentTarget.value);
        }
    }
    useEffect(() => {
        setClue(configurateClue(title,props.hasName??"",props.hash??{},clue))
        console.log("debouns");
    }, [debouncedValue]);

    useEffect(()=>{
        let timeaut: NodeJS.Timeout;
        if(langError){
            console.log("juujuu");
            const t: NodeJS.Timeout =  setTimeout(()=>{
                setLangErr("")
            },2000)
            timeaut = t
        }
        return ()=>{clearTimeout(timeaut);
                 console.log("clerFunc")}
    },[editMode,langError])

    return editMode ?
        <div style={{position:"relative"}}>
            {clue.length!==0 && <ul className={style.clue}>{clue.map(e => <li>{e}</li>)}</ul>}
            <input className={style.input} style={langError&&!isTitle?{color:"red",boxShadow: "0 0 10px rgb(253, 240, 1)"}:{}}
                type={props.type}
                        placeholder={props.placeholder?props.placeholder:""}
                        value={title}
                        onChange={changeTitle}
                        autoFocus
                        onBlur={activateViewMode}
                        onKeyDown={(e:KeyboardEvent<HTMLInputElement>)=>e.key==="Enter"&&activateViewMode()}
            />
        </div>:
        <span className={style.spanContainer}>
            <span className={style.span}
                onClick={activateEditMode}>
                {
                    props.title
                }
            </span>{props.lang && langError && !isTitle &&
            <span className={style.triger}
                  >
                  {langError?`  -> '${langError}'`:null}
            </span>}
        </span>
}
