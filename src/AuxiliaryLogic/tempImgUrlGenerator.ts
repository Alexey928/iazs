

export const urlRandomiser  = (urls:Array<string>=imgUrls):string=>{
    const random:number = Math.round((urls.length-1)*Math.random())
    return urls[random]
};
const imgUrls = [
    "https://hostenko.com/wpcafe/wp-content/uploads/rndavatar.png",
    "https://russia-dropshipping.ru/800/600/https/proprikol.ru/wp-content/uploads/2019/08/krutye-kartinki-dlya-vk-22.jpg",
];
