<template>
    <h1>Products In Orders Index</h1>
    <router-link :to="'/productsInOrders/create/'"
                        >Create new</router-link
                     >
    <table class="table">
        <thead>
            <tr>
                <th>Product ID</th>
                <th>Order ID</th>
                <th>ProductAmount</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in productsInOrders" :key="item.id">
                <td>{{ item.productId }}</td>
                <td>{{ item.orderId }}</td>
                <td>{{ item.productAmount }}</td>
                <td>
                    <router-link :to="'/productsInOrders/details/' + item.id"
                        >Details</router-link
                    >
                    <template v-if="isUserLoggedIn">
                        |
                        <router-link :to="'/productsInOrders/edit/' + item.id"
                            >Edit</router-link
                        >
                        |
                        <router-link :to="'/productsInOrders/delete/' + item.id"
                            >Delete</router-link
                        >
                    </template>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import store from "@/store/index";
import { BaseService } from "@/services/base-service";
import { IProductInOrder } from "@/domain/IProductInOrder";

@Options({
    components: {},
    props: {},
})
export default class ProductsInOrdersIndex extends Vue {
    productsInOrders: IProductInOrder[] | null = null;

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
        const service = new BaseService<IProductInOrder>(
            "https://jakaar.azurewebsites.net/api/v1/ProductsInOrders",
            store.state.token ? store.state.token : undefined
        );
        service.getAll().then((data) => {
            this.productsInOrders = data.data!;
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
