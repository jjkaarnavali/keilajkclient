export interface IPayment{
    id: string | undefined;
    paymentTypeId: string;
    billId: string;
    personId: string;
}