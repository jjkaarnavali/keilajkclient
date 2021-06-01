<template>
    <h1>{{ state.baseLangResources.commons.thanksForOrdering }}</h1>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import store, { IState } from "@/store/index";
import { BaseService } from "@/services/base-service";
import { IProduct } from "@/domain/IProduct";
import { IPrice } from "@/domain/IPrice";
import { IOrder } from "@/domain/IOrder";
import { IBill } from "@/domain/IBill";
import { ILineOnBill } from "@/domain/ILineOnBill";
import { IProductInOrder } from "@/domain/IProductInOrder";
import { IPaymentType } from "@/domain/IPayment-Type";
import { IPayment } from "@/domain/IPayment";

@Options({
    components: {},
    props: {
        id: String,
    },
})
export default class PurchaseReceivedPageIndex extends Vue {
    id!: string;
    products: IProduct[] | null = null;
    linesOnBills: ILineOnBill[] | null = null;
    paymentTypes: IPaymentType[] | null = null;
    prices: IPrice[] | null = null;
    orders: IOrder[] | null = null;
    bills: IBill[] | null = null;
    productsInOrders: IProductInOrder[] | null = null;
    today = new Date();
    billToPay: IBill = {
        id: "",
        personId: "",
        userId: "",
        orderId: "",
        billNr: "",
        creationTime: this.today.toString(),
        priceWithoutTax: 0,
        sumOfTax: 0,
        priceToPay: 0
    };

    orderToPay: IOrder = {
        id: "",
        userId: "",
        until: ""
    };

    payment: IPayment = {
        id: "",
        paymentTypeId: "",
        billId: "",
        personId: ""
    };

    private state: IState = {
        token: "",
        isAdmin: false,
        firstname: "",
        lastname: "",
        supportedLanguages: [],
        currentLanguage: { name: 'et', nativeName: 'eesti' },
        langResources: {
            views: {
                shared: {
                    layout: {
                        languages: "Select language"
                    }
                }
            }
        },
        baseLangResources: {
            commons: {
                askForDeleteConfirmation: "",
                back: "",
                buy: "",
                cart: "",
                create: "",
                edit: "",
                details: "",
                delete: "",
                home: "",
                logout: "",
                login: "",
                register: "",
                products: "",
                save: "",
                select: "",
                thanksForOrdering: "",
                purchase: "",
                remove: "",
                shop: "",
                addToCart: "",
                view: "",
                totalPrice: "",
                productName: "",
                productAmount: "",
                price: "",
                firstName: "",
                lastName: "",
                idCode: "",
                person: "",
                createPerson: "",
                paymentTypeName: ""
            }
        },
        appInitialized: true
    };

    get isUserLoggedIn(): boolean {
        return store.state.token != null;
    }

    beforeCreate(): void {
        console.log("beforeCreate");
    }

    created(): void {
        console.log("created");
    }

    async beforeMount(): Promise<void> {
        console.log("beforeMount");
        const billService = new BaseService<IBill>(
            "https://jakaar.azurewebsites.net/api/v1/Bills",
            store.state.token ? store.state.token : undefined
        );
        await billService.getAll().then((data) => {
            this.bills = data.data!;
        });

        const orderService = new BaseService<IOrder>(
            "https://jakaar.azurewebsites.net/api/v1/Orders",
            store.state.token ? store.state.token : undefined
        );
        await orderService.getAll().then((data) => {
            this.orders = data.data!;
        });

        var token = store.state.token;
        var base64Url = token!.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        var decodedToken = JSON.parse(jsonPayload);
        var userId = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];

        this.orders!.forEach(order => {
            if (order.userId === userId && !order.until) {
                this.orderToPay = order;
            }
        });

        this.bills!.forEach(bill => {
            if (bill.orderId === this.orderToPay.id) {
                this.billToPay = bill;
            }
        });

        this.payment.paymentTypeId = this.id;
        this.payment.billId = this.billToPay.id!;
        this.payment.personId = this.billToPay.personId;

        const paymentService = new BaseService<IPayment>(
            "https://jakaar.azurewebsites.net/api/v1/Payments",
            store.state.token ? store.state.token : undefined
        );

        await paymentService.post(this.payment);

        // Mark orders  as completed
        this.orderToPay.until = "done";
        await orderService.put(this.orderToPay);

        this.state = store.state;
    }

    mounted(): void {
        console.log("mounted", store.state.token);
        const service = new BaseService<IPaymentType>(
            "https://jakaar.azurewebsites.net/api/v1/PaymentTypes",
            store.state.token ? store.state.token : undefined
        );
        service.getAll().then((data) => {
            this.paymentTypes = data.data!;
        });
    }

    beforeUpdate(): void {
        console.log("beforeUpdate");
    }

    updated(): void {
        console.log("updated");
    }

    activated(): void {
        console.log("activated");
    }

    deactivated(): void {
        console.log("deactivated");
    }

    beforeUnmount(): void {
        console.log("beforeUnmount");
    }

    unmounted(): void {
        console.log("unmounted");
    }
}
</script>
