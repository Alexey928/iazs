
export const validateInputValue=(inputValue:string,errSeater:(err:boolean)=>void):boolean=>{
    if (inputValue.trim()) {
        errSeater(false);
        return true
    }else{
        errSeater(true);
        return false
    }
}


