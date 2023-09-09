export interface IProduct {
    id:number,
    name:string,
    quantity:number,
    price:number,
    img?:string,
    brand?:string,
    categoryId?:number,
    category:string,
    color:string[]
    desc:string;
}
