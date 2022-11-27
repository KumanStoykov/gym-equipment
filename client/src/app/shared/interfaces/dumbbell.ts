export interface IDumbbell {
    _id: string;
    brand: string;
    price: number;
    promoPrice: number;
    madeIn: string;
    material: string;
    knurl: string;
    rangeOfAvailableWeightsFrom: number;
    rangeOfAvailableWeightsTo: number;
    rangeOfDumbbellLengthsFrom: number;
    rangeOfDumbbellLengthsTo: number;
    handleDiameterFrom: number;
    handleDiameterTo: number;
    description: string;
    images: string[];
}
