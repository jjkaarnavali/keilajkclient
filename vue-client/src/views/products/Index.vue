<template>
    <h1>Products Index</h1>
    <router-link :to="'/products/create/'"
                        >Create new</router-link
                     >
    <table class="table">
        <thead>
            <tr>
                <th>Company ID</th>
                <th>Producttype ID</th>
                <th>ProductName</th>
                <th>ProductSize</th>
                <th>ProductSeason</th>
                <th>ProductCode</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in products" :key="item.id">
                <td>{{ item.companyId }}</td>
                <td>{{ item.productTypeId }}</td>
                <td>{{ item.productName }}</td>
                <td>{{ item.productSize }}</td>
                <td>{{ item.productSeason }}</td>
                <td>{{ item.productCode }}</td>
                <td>
                    <router-link :to="'/products/details/' + item.id"
                        >Details</router-link
                    >
                    <template v-if="isUserLoggedIn">
                        |
                        <router-link :to="'/products/edit/' + item.id"
                            >Edit</router-link
                        >
                        |
                        <router-link :to="'/products/delete/' + item.id"
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
import { IProduct } from "@/domain/IProduct";

@Options({
    components: {},
    props: {},
})
export default class ProductIndex extends Vue {
    products: IProduct[] | null = null;

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
        service.getAll().then((data) => {
            this.products = data.data!;
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
