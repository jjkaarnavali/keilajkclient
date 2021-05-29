export interface ILineOnBill{
    id: string | undefined;
    billId: string;
    priceId: string;
    productId: string;
    amount: string;
    taxPercentage: number;
    priceWithoutTax: number;
    sumOfTax: number;
    priceToPay: number
}