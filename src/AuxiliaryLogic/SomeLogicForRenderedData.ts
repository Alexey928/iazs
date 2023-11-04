const imgUrls = [
    "https://hostenko.com/wpcafe/wp-content/uploads/rndavatar.png",
    "https://russia-dropshipping.ru/800/600/https/proprikol.ru/wp-content/uploads/2019/08/krutye-kartinki-dlya-vk-22.jpg",
];

export const urlRandomiser  = (urls:Array<string>=imgUrls):string=>{
    const random:number = Math.round((urls.length-1)*Math.random())
    return urls[random]
};


export function siftingArray<T>(inputArray: T[]): T[] {

    if (inputArray.length <= 300) return inputArray

    const ratio = inputArray.length / 300;
    const prunedArray: T[] = [];

    for (let i = 0; i < 300; i++) {
        const index = Math.floor(i * ratio);
        prunedArray.push(inputArray[index]);
    }
    return prunedArray;
}

const  shortenName = (fullName:string|null):string|null=>{
    const n = fullName ? fullName.split(" ").map((item,i)=>{
        return   i===0 ? item:item.charAt(0).toUpperCase();
    }).join(" "):null;
    console.log(n ,`---> ${fullName}`)
    return n
}