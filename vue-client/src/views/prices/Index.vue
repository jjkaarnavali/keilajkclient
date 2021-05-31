<template>
    <h1>Prices Index</h1>
    <router-link :to="'/prices/create/'"
                        >Create new</router-link
                     >
    <table class="table">
        <thead>
            <tr>
                <th>Product ID</th>
                <th>Discount ID</th>
                <th>Price</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in prices" :key="item.id">
                <td>{{ item.productId }}</td>
                <td>{{ item.discountId }}</td>
                <td>{{ item.priceInEur }}</td>
                <td>
                    <router-link :to="'/prices/details/' + item.id"
                        >Details</router-link
                    >
                    <template v-if="isUserLoggedIn">
                        |
                        <router-link :to="'/prices/edit/' + item.id"
                            >Edit</router-link
                        >
                        |
                        <router-link :to="'/prices/delete/' + item.id"
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
import { IPrice } from "@/domain/IPrice";

@Options({
    components: {},
    props: {},
})
export default class PriceIndex extends Vue {
    prices: IPrice[] | null = null;

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
        const service = new BaseService<IPrice>(
            "https://jakaar.azurewebsites.net/api/v1/Prices",
            store.state.token ? store.state.token : undefined
        );
        service.getAll().then((data) => {
            this.prices = data.data!;
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
