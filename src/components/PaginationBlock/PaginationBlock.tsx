import React from 'react';

export type paginationPropsType= {
    pagesCount:number
    curentPage:number
    setCurentPage:(pageNumber:number)=>void
}


const PaginationBlock = (props:paginationPropsType) => {

    const firstButtons:Array<number> = [];
    const lastButtons:Array<number> = [];
    console.log(props.pagesCount)

    if(props.pagesCount>=5){
        for (let i=props.curentPage;i<props.curentPage+3;i++){
            firstButtons.push(i);
        }
        for (let i = props.pagesCount;i>props.pagesCount-2;i--){
            lastButtons.push(i);
        }
    }

return (
        <div>

            <span style={{backgroundColor:"red",marginLeft:5,marginTop:3}}>{"<<"}</span>
            {firstButtons.map(el=><button onClick={()=>props.setCurentPage(el)} key={el}>{el}</button>)}
            {"<<...>>"}
            {lastButtons.reverse().map(el=><button onClick={()=>props.setCurentPage(el)} key={el}>{el}</button>)}
            <span style={{backgroundColor:"red",marginLeft:5,marginTop:3}}>{">>"}</span>
        </div>
    );
};

export default PaginationBlock;