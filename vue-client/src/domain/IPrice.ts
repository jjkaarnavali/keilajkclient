export interface IPrice{
    id: string | undefined;
    productId: string;
    discountId: string;
    priceInEur: string;
    until: string | undefined;
}