


export const required = (value:string|undefined)=>{
    console.log(value)
    return value?undefined:"field is required"
}
export const maxLength =  (value:string|undefined) =>
    value && value.length > 35? `Must be ${35} characters or less` : undefined

export const minLength =  (value:string|undefined) =>
    value && value.length < 4 ? `Must be at least ${4}` : undefined

export const notSpaces = (value:string|undefined)=>
    value?value.split(" ").length>1?"can not bee spaces":undefined:"field is required"