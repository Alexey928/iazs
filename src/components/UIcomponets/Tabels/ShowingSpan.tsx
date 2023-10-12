import React, {useState} from 'react';
type ShowingPropsType = {
    value:string|number
    name:string
    dataArray:{[p: string]: string | number | null}[]
}

const ShowingSpan:React.FC<ShowingPropsType> = React.memo(({value,name,dataArray}) => {
    const [active,setActive] = useState(false);

    const totalTransactionFuelValue  = ()=>{
        console.log("factory")
        return  dataArray.reduce((acum,el)=>{
            return acum += Number(el["_volume"]);},0
        )
    };

    return (
        <span onClick={()=>setActive(!active)}>
          {active?value:name}
        </span>
    );
});

export default ShowingSpan;