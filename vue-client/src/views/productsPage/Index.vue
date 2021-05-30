<template>
    <section class="py-5">
        <div class="container px-4 px-lg-5 mt-5">
            <div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                    <div class="col mb-5" v-for="item in products" :key="item.id">
                        <div class="card h-100">
                            <!-- Product image-->
                            <img class="card-img-top" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt="..."/>
                            <!-- Product details-->
                            <div class="card-body p-4">
                                <div class="text-center">
                                    <!-- Product name-->
                                    <h5 class="fw-bolder">{{ item.productName }}</h5>
                                    <!-- Product price-->
                                    <div v-for="price in prices" :key="price.id">
                                        <a v-if="item.id === price.productId">{{ price.priceInEur }}</a>
                                    </div>
                                </div>
                            </div>
                            <!-- Product actions-->
                            <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                <div class="text-center"><router-link :to="'/productDetailsPage/Index/' + item.id"
                        >{{ state.baseLangResources.commons.view }}</router-link>
                        </div>
                            </div>
                            <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                <div class="form-group">
                                    <button
                                        @click="addToCart($event, item.id)"
                                        type="submit"
                                        class="btn btn-primary"
                                    >
                                    {{ state.baseLangResources.commons.addToCart }}
                                    </button>
                                </div>
                            </div>
                    </div>
                    </div>
            </div>
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
    props: {},
})
export default class ProductsPageIndex extends Vue {
    products: IProduct[] | null = null;
    prices: IPrice[] | null = null;
    orders: IOrder[] | null = null;
    productsInOrders: IProductInOrder[] | null = null;
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
                view: ""
            }
        },
        appInitialized: true
    };

    async addToCart(event: Event, id: string): Promise<void> {
        console.log(id);
        console.log(event);
        const ordersService = new BaseService<IOrder>(
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
        console.log(this.orders);

        ordersService.getAll().then((data) => {
            console.log("data");
            console.log(data.data);
            this.orders = data.data!;
            console.log(this.orders);
            var activeOrder = false;
            var activeOrderId = '';
            var productWasUpdated = false;

            this.orders!.forEach(order => {
                if (order.userId === userId && order.until === null) {
                    activeOrder = true
                }
            });
            console.log(activeOrder);

            if (activeOrder === false) {
                const objToCreate: IOrder = {
                    id:
                    undefined,
                    userId:
                    userId,
                    until:
                    undefined
                };

                const response = ordersService.post(objToCreate);
                console.log(response);
            }

            const productInOrderService = new BaseService<IProductInOrder>(
                "https://localhost:5001/api/v1/ProductsInOrders",
                store.state.token ? store.state.token : undefined
            );
            this.orders!.forEach(order => {
                if (order.userId === userId && order.until === null) {
                    activeOrderId = order.id!;
                }
            })

            productInOrderService.getAll().then((data) => {
                this.productsInOrders = data!.data!;

                this.productsInOrders!.forEach(productInOrder => {
                    if (productInOrder.productId === id && productInOrder.orderId === activeOrderId && !productInOrder.until) {
                        var updatedProductInOrder = productInOrder;
                        updatedProductInOrder.productAmount += 1;
                        productInOrderService.put(updatedProductInOrder);
                        productWasUpdated = true;
                    }
                })

                if (!productWasUpdated) {
                        this.orders!.forEach(order => {
                            if (order.userId === userId && order.until === null) {
                                const inOrderObjToCreate: IProductInOrder = {
                                    id:
                                    undefined,
                                    productId:
                                    id,
                                    orderId:
                                    order.id!,
                                    productAmount:
                                    "1",
                                    until:
                                    undefined
                                };
                                const response = productInOrderService.post(inOrderObjToCreate);

                                console.log(response);
                            }
                        });
                }
            });
        });

        /* this.orders!.forEach(order => {
            if (order.userId === userId && order.until === null) {
                activeOrder = true
            }
            console.log(order)
        }); */
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
            "https://localhost:5001/api/v1/Products",
            store.state.token ? store.state.token : undefined
        );
        service.getAll().then((data) => {
            this.products = data.data!;
        });
        const service2 = new BaseService<IPrice>(
            "https://localhost:5001/api/v1/Prices",
            store.state.token ? store.state.token : undefined
        );
        service2.getAll().then((data) => {
            this.prices = data.data!;
        });
        console.log("this.state");
        console.log(this.state);
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
