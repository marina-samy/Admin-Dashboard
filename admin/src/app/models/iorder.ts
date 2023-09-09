export interface IOrder {
    id?:number;
    phone?:string;
    userName:string;
    status:string;
    items: number;
    totalPrice: number;
    orderDetails: {
        img:string;
        shippingAddress: string;
        city: string;
        productName: string;
        price: string; 
        phone: string; 
        color: string;
      }[];
}


