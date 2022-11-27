export interface ITreadmill {
    _id: string;
    brand: string;
    price: number;
    promoPrice: number;
    madeIn: string;
    material: string;
    dimensions: string;
    equipmentWeight: number;
    runningSurface: number;
    motorPower: string;
    minSpeed: number;
    maxSpeed: number;
    InclineMin: number;
    InclineMax: number;
    availableLanguages: string;
    display: string;
    description: string;
    images: string[];
}
