export interface IRack {
    _id: string;
    brand: string;
    price: number;
    promoPrice: number;
    madeIn: string;
    material: string;
    maximumUserWeight: number;
    maximumLoadUseable: number;
    dimensions: string;
    transportWheels: number;
    netWeight: number;
    description: string;
    images: string[];
}
