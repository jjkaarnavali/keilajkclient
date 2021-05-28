<template>
    <section class="py-5">
        <table class="table">
            <thead>
                <tr>
                    <th>
                        Product name
                    </th>
                    <th>
                        Product amount
                    </th>
                    <th>
                        Price
                    </th>
                    <th></th>
                </tr>
            </thead>
            <tbody v-for="product in products" :key="product.id">
                    <tr>
                    <th>
                        <a>{{product.productName}}</a>
                    </th>
                    <th v-for="productInOrder in productsInOrders" :key="productInOrder.id">
                        <a v-if="productInOrder.productId === product.id">{{productInOrder.ProductAmount}}</a>
                    </th>
                    <th v-for="price in prices" :key="price.id">

                        <div v-for="productInOrder in productsInOrders" :key="productInOrder.id">
                            <a v-if="product.id === price.productId && price.until == null && productInOrder.productId === product.id">{{price.priceInEur * productInOrder.productAmount}}</a>
                        </div>
                    </th>
                    <th v-for="productInOrder in productsInOrders" :key="productInOrder.id">
                        <button
                            @click="remove($event, productInOrder.id)"
                            type="submit"
                            class="btn btn-primary"
                        >
                            Remove
                        </button>
                    </th>
                </tr>
            </tbody>
        </table>

        <a>{{totalprice}}</a>

        <a asp-controller="SelectPersonPage" asp-action="Index" asp-route-total="@Model.totalPrice">Purchase</a>
    </section>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import store from "@/store/index";
import { BaseService } from "@/services/base-service";
import { IProduct } from "@/domain/IProduct";
import { IPrice } from "@/domain/IPrice";
import { IOrder } from "@/domain/IOrder";
import { IProductInOrder } from "@/domain/IProductInOrder";

@Options({
    components: {},
    props: {
        id: String,
    },
})
export default class ProductDetailsPageIndex extends Vue {
    id!: string;
    products: IProduct[] | null = null;
    productsInOrders: IProductInOrder[] | null = null;
    prices: IPrice[] | null = null;

    usersProducts: IProduct[] | null = null;
    usersProductsInOrders: IProductInOrder[] | null = null;
    usersPrices: IPrice[] | null = null;

    totalprice: string | undefined;

    orders: IOrder[] | null = null;
    product: IProduct = {
        id: "",
        companyId: "",
        productTypeId: "",
        productName: "",
        productSize: "",
        productSeason: "",
        productCode: ""
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

    beforeMount(): void {
        console.log("beforeMount");
    }

    mounted(): void {
        console.log("mounted", store.state.token);
        const service = new BaseService<IProduct>(
            "https://localhost:5001/api/v1/Products",
            store.state.token ? store.state.token : undefined
        );
        // console.log(this.id);
        console.log("lmao");
        service.getAll().then((data) => {
            this.products = data.data!;
            console.log(this.prices);
        });
        const service2 = new BaseService<IPrice>(
            "https://localhost:5001/api/v1/Prices",
            store.state.token ? store.state.token : undefined
        );
        service2.getAll().then((data) => {
            this.prices = data.data!;
            console.log(this.prices);
        });

        const service3 = new BaseService<IProductInOrder>(
            "https://localhost:5001/api/v1/ProductsInOrders",
            store.state.token ? store.state.token : undefined
        );
        service3.getAll().then((data) => {
            this.productsInOrders = data.data!;
            console.log(this.productsInOrders);
        });

        const service4 = new BaseService<IOrder>(
            "https://localhost:5001/api/v1/Orders",
            store.state.token ? store.state.token : undefined
        );
        service4.getAll().then((data) => {
            this.orders = data.data!;
            console.log(this.orders);
        });

        var token = store.state.token;
        var base64Url = token!.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        var decodedToken = JSON.parse(jsonPayload);
        var userId = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];

        const usersOrder: IOrder = {
            id:
            undefined,
            userId:
            userId,
            until:
            undefined
        };

        // Find the users order
        this.orders!.forEach(order => {
            if (order.userId === userId && order.until === undefined) {
                usersOrder.id = order.id;
            }
        });

        // Find the productsInOrders that are for users order
        this.usersProductsInOrders = this.productsInOrders!.filter(x => x.orderId === usersOrder.id && x.until === undefined);

        // Find the products
        this.usersProductsInOrders!.forEach(productInOrder => {
            this.products!.forEach(product => {
                if (productInOrder.productId === product.id) {
                    this.usersProducts?.push(product);
                }
            });
        });

        // Find the prices
        this.usersProducts!.forEach(product => {
            this.prices!.forEach(price => {
                if (price.productId === product.id && !price.until) {
                    this.usersPrices?.push(price);
                }
            });
        });

        // Find total price
        this.totalprice = "0";
        this.usersProducts!.forEach(product => {
            this.usersPrices!.forEach(price => {
                this.usersProductsInOrders!.forEach(productInOrder => {
                    if (product.id === price.productId && price.until === undefined && productInOrder.productId === product.id) {
                        const priceT = parseInt(this.totalprice!) + parseInt(price.priceInEur) * parseInt(productInOrder.productAmount);
                        this.totalprice = priceT.toString();
                    }
                });
            });
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
