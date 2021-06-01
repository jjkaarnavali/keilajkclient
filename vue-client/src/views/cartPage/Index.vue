<template>
    <section class="py-5">
        <table class="table">
            <thead>
                <tr>
                    <th>
                        {{ state.baseLangResources.commons.productName }}
                    </th>
                    <th>
                        {{ state.baseLangResources.commons.productAmount }}
                    </th>
                    <th>
                        {{ state.baseLangResources.commons.price }}
                    </th>
                    <th></th>
                </tr>
            </thead>
            <tbody v-for="product in usersProducts" :key="product.id">
                    <tr>
                    <th>
                        <a>{{product.productName}}</a>
                    </th>
                    <th>
                        <div v-for="productInOrder in usersProductsInOrders" :key="productInOrder.id">
                            <a v-if="productInOrder.productId === product.id">{{productInOrder.productAmount}}</a>
                        </div>
                    </th>
                    <th>
                        <div v-for="price in usersPrices" :key="price.id">
                            <div v-for="productInOrder in usersProductsInOrders" :key="productInOrder.id">
                                <a v-if="product.id === price.productId && price.until == null && productInOrder.productId === product.id">{{price.priceInEur * productInOrder.productAmount}}</a>
                            </div>
                        </div>
                    </th>
                    <th>
                        <div v-for="productInOrder in usersProductsInOrders" :key="productInOrder.id">
                        <button
                            v-if="productInOrder.productId === product.id"
                            @click="remove($event, productInOrder.id)"
                            type="submit"
                            class="btn btn-primary"
                        >
                            <router-link
                                to="/CartPage/Index"
                                class="nav-link text-light"
                                >{{ state.baseLangResources.commons.remove }}</router-link
                            >
                        </button>
                        </div>
                    </th>
                </tr>
            </tbody>
        </table>

        <a>{{totalprice}} eur</a>

        <div class="text-center"><router-link :to="'/selectPersonPage/Index/'"
            >{{ state.baseLangResources.commons.purchase }}</router-link>
        </div>
    </section>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import store, { IState } from "@/store/index";
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

    async remove(event: Event, id: string): Promise<void> {
        const productInOrderService = new BaseService<IProductInOrder>(
            "https://jakaar.azurewebsites.net/api/v1/ProductsInOrders",
            store.state.token ? store.state.token : undefined
        );

        var productInOrderToRemove = (await productInOrderService.get(id)).data;
        console.log(productInOrderToRemove);
        var today = new Date();
        productInOrderToRemove!.until = today.toString();
        console.log(productInOrderToRemove!.until);
        await productInOrderService.delete(productInOrderToRemove!);
    }

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
        this.state = store.state;
    }

    mounted(): void {
        console.log("mounted", store.state.token);
        const service = new BaseService<IProduct>(
            "https://jakaar.azurewebsites.net/api/v1/Products",
            store.state.token ? store.state.token : undefined
        );
        // console.log(this.id);
        console.log("lmao");
        service.getAll().then((data) => {
            this.products = data.data!;
            // console.log(this.prices);

            const service2 = new BaseService<IPrice>(
                "https://jakaar.azurewebsites.net/api/v1/Prices",
                store.state.token ? store.state.token : undefined
            );
            service2.getAll().then((data) => {
                this.prices = data.data!;
                // console.log(this.prices);

                const service3 = new BaseService<IProductInOrder>(
                    "https://jakaar.azurewebsites.net/api/v1/ProductsInOrders",
                    store.state.token ? store.state.token : undefined
                );
                service3.getAll().then((data) => {
                    this.productsInOrders = data.data!;
                    // console.log(this.productsInOrders);

                    const service4 = new BaseService<IOrder>(
                        "https://jakaar.azurewebsites.net/api/v1/Orders",
                        store.state.token ? store.state.token : undefined
                    );
                    service4.getAll().then((data): void => {
                        this.orders = data.data!;

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
                        console.log("this.orders");
                        console.log(this.orders);
                        // Find the users order
                        this.orders!.forEach(order => {
                            if (order.userId === userId && !order.until) {
                                usersOrder.id = order.id;
                            }
                        });
                        console.log("usersOrder");
                        console.log(usersOrder);

                        // Find the productsInOrders that are for users order
                        this.usersProductsInOrders = this.productsInOrders!.filter(x => x.orderId === usersOrder.id && !x.until);

                        console.log("usersProductsInOrders");
                        console.log(this.usersProductsInOrders);

                        // Find the products
                        if (this.usersProductsInOrders !== null) {
                            for (var i = 0, len = this.usersProductsInOrders.length; i < len; i++) {
                                if (!this.usersProducts) {
                                    this.usersProducts = this.products!.filter(x => x.id === this.usersProductsInOrders![i].productId);
                                } else {
                                    this.usersProducts!.push(this.products!.filter(x => x.id === this.usersProductsInOrders![i].productId)[0]);
                                }
                            // this.usersProducts = this.products!.filter(x => x.id === this.usersProductsInOrders![i].productId);
                            }

                            console.log("usersProducts");
                            console.log(this.usersProducts);

                            // Find the prices
                            for (var s = 0, lengh = this.usersProducts!.length; s < lengh; s++) {
                                if (!this.usersPrices) {
                                    this.usersPrices = this.prices!.filter(x => x.productId === this.usersProducts![s].id);
                                } else {
                                    this.usersPrices!.push(this.prices!.filter(x => x.productId === this.usersProducts![s].id)[0]);
                                }
                                // this.usersPrices = this.prices!.filter(x => x.productId === this.usersProducts![s].id);
                            }
                            console.log("this.usersPrices");
                            console.log(this.usersPrices);
                            // Find total price
                            this.totalprice = "0";
                            console.log("this.totalprice");
                            console.log(this.totalprice);
                            this.usersProducts!.forEach(product => {
                                this.usersPrices!.forEach(price => {
                                    this.usersProductsInOrders!.forEach(productInOrder => {
                                        if (product.id === price.productId && !price.until && productInOrder.productId === product.id) {
                                            const priceT = parseInt(this.totalprice!) + parseInt(price.priceInEur) * parseInt(productInOrder.productAmount);
                                            this.totalprice = priceT.toString();
                                            console.log(priceT);
                                            console.log(this.totalprice);
                                        }
                                    });
                                });
                            });
                        }
                    });
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
