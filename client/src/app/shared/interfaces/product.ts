import { IImage } from './image';

export interface IProduct {
    _id: string;
    brand: string;
    images: IImage[];
    quantity: number | 0;
    price: number;
    promoPrice: number;
    productType: string;
    urlPrefix?: string;
}
