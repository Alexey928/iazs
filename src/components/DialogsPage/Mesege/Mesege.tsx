import React from 'react';
type MesegePropsType = {
    mesege:string
}
const Mesege:React.FC<MesegePropsType> = ({mesege}) => {
    return (
        <label>
            {mesege}
        </label>
    );
};

export default Mesege;