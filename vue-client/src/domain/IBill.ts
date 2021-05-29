export interface IBill{
    id: string | undefined;
    personId: string;
    userId: string;
    orderId: string;
    billNr: string;
    creationTime: string;
    priceWithoutTax: number;
    sumOfTax: number;
    priceToPay: number
}