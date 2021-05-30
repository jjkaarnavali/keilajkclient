<template>
    <table class="table">
        <thead>
            <tr>
                <th>
                    {{ state.baseLangResources.commons.paymentTypeName }}
                </th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="paymentType in paymentTypes" :key="paymentType.id">
                <td>
                    {{paymentType.paymentTypeName}}
                </td>
                <td>
                    <button
                        type="submit"
                        class="btn btn-primary"
                    >
                        <router-link
                            :to="'/purchaseReceivedPage/Index/' + paymentType.id"
                            class="nav-link text-light"
                            >{{ state.baseLangResources.commons.select }}</router-link
                        >
                    </button>
                </td>
            </tr>
        </tbody>
    </table>
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

@Options({
    components: {},
    props: {
        id: String,
    },
})
export default class PurchasePageIndex extends Vue {
    id!: string;
    products: IProduct[] | null = null;
    linesOnBills: ILineOnBill[] | null = null;
    paymentTypes: IPaymentType[] | null = null;
    billsLinesOnBills: ILineOnBill[] | null = null;
    prices: IPrice[] | null = null;
    orders: IOrder[] | null = null;
    bills: IBill[] | null = null;
    productsInOrders: IProductInOrder[] | null = null;
    today = new Date();
    bill: IBill = {
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

    currentOrder: IOrder = {
        id: "",
        userId: "",
        until: ""
    };

    private state: IState = {
        token: "",
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
        const orderService = new BaseService<IOrder>(
            "https://localhost:5001/api/v1/Orders",
            store.state.token ? store.state.token : undefined
        );

        var token = store.state.token;
        var base64Url = token!.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        var decodedToken = JSON.parse(jsonPayload);
        var userId = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];

        await orderService.getAll().then((data) => {
            this.orders = data.data!;
        });
        this.orders!.forEach(order => {
            if (order.userId === userId && !order.until) {
                this.bill.orderId = order.id!;
                this.currentOrder = order;
            }
        });
        this.bill.personId = this.id;
        this.bill.userId = userId;
        console.log("this.id");
        console.log(this.id);
        this.bill.priceWithoutTax = 0;
        this.bill.priceToPay = 0;
        this.bill.sumOfTax = 0;

        const billService = new BaseService<IBill>(
            "https://localhost:5001/api/v1/Bills",
            store.state.token ? store.state.token : undefined
        );
        console.log("this.bill");
        console.log(this.bill);
        console.log("post empty bill");
        await billService.post(this.bill);

        await billService.getAll().then((data) => {
            this.bills = data!.data!;
        })

        console.log("siin peab olema just tehtud bill");
        console.log(this.bills);
        this.bills!.forEach(bill => {
            if (bill.orderId === this.currentOrder.id) {
                this.bill = bill;
            }
        });
        console.log("tahaks naha bill id")
        console.log(this.bill);

        const productInOrderService = new BaseService<IProductInOrder>(
            "https://localhost:5001/api/v1/ProductsInOrders",
            store.state.token ? store.state.token : undefined
        );
        await productInOrderService.getAll().then((data) => {
            this.productsInOrders = data!.data!;
        })
        const lineOnBillService = new BaseService<ILineOnBill>(
            "https://localhost:5001/api/v1/LinesOnBills",
            store.state.token ? store.state.token : undefined
        );
        const priceService = new BaseService<IPrice>(
            "https://localhost:5001/api/v1/Prices",
            store.state.token ? store.state.token : undefined
        );
        await priceService.getAll().then((data) => {
            this.prices = data!.data!;
        })

        this.productsInOrders!.forEach(productInOrder => {
            this.prices!.forEach(price => {
                if (productInOrder.orderId === this.currentOrder.id && !productInOrder.until && price.productId === productInOrder.productId && !price.until) {
                    var lineOnBill: ILineOnBill = {
                        id: "",
                        billId: this.bill.id!,
                        priceId: price.id!,
                        productId: productInOrder.productId,
                        amount: productInOrder.productAmount,
                        taxPercentage: 0.2,
                        priceWithoutTax: parseInt(price.priceInEur) * parseInt(productInOrder.productAmount),
                        priceToPay: 0,
                        sumOfTax: 0,
                    };
                    lineOnBill.priceToPay = lineOnBill.priceWithoutTax * lineOnBill.taxPercentage + lineOnBill.priceWithoutTax;
                    lineOnBill.sumOfTax = lineOnBill.priceToPay - lineOnBill.priceWithoutTax;
                    console.log("lineOnBill");
                    console.log(lineOnBill);
                    if (!this.billsLinesOnBills) {
                        this.billsLinesOnBills = [];
                        this.billsLinesOnBills[0] = lineOnBill;
                    } else {
                        this.billsLinesOnBills![this.billsLinesOnBills!.length] = lineOnBill;
                    }
                    console.log("line added");
                }
            });
        });

        console.log("this.billsLinesOnBills");
        console.log(this.billsLinesOnBills);
        for (let i = 0; i < this.billsLinesOnBills!.length; i++) {
            await lineOnBillService.post(this.billsLinesOnBills![i]);
        }

        // update bill prices
        await lineOnBillService.getAll().then((data) => {
            this.linesOnBills = data!.data!;
        })
        console.log("this.linesOnBills");
        console.log(this.linesOnBills);
        this.linesOnBills!.forEach(lineOnBill => {
            if (lineOnBill.billId === this.bill.id) {
                this.bill.priceWithoutTax += lineOnBill.priceWithoutTax;
                this.bill.priceToPay += lineOnBill.priceToPay;
                this.bill.sumOfTax += lineOnBill.sumOfTax;
                console.log("price updated");
            }
        });
        console.log("update bill");
        console.log(this.bill);
        await billService.put(this.bill);

        this.state = store.state;
    }

    mounted(): void {
        console.log("mounted", store.state.token);
        const service = new BaseService<IPaymentType>(
            "https://localhost:5001/api/v1/PaymentTypes",
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
