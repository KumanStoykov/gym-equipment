import { IImage } from './image';

export interface IOrder {
    _id: string;
    products: [{
        price: number;
        quantity: number;
        productType: string;
        _id: string;
        product: {
            _id: string;
            images: IImage[],
            brand: string,
        }
    }];
    status: string;
    user?: string;
    guest?: {
        firstName: string;
        lastName: string;
    },
    isVisible: boolean;
    deliveryPrice: number;
    totalPrice: number;
    completed: boolean;
    createdAt: string;
}
