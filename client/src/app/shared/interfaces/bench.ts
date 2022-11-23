export interface IBench {
    _id: string;
    brand: string;
    price: number;
    promoPrice: number;
    madeIn: string;
    material: string;
    minUserWeight: number;
    maxUserWeight: number;
    dimensions: string;
    transportWheels: number;
    netWeight: number;
    description: string;
    images: string[];
}
