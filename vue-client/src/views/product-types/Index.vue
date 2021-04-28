<template>
    <h1>Product types Index</h1>
    <router-link :to="'/product-types/create/'"
                        >Create new</router-link
                     >
    <table class="table">
        <thead>
            <tr>
                <th>Product type</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in productTypes" :key="item.id">
                <td>{{ item.typeName }}</td>
                <td>
                    <router-link :to="'/product-types/details/' + item.id"
                        >Details</router-link
                    >
                    <template v-if="isUserLoggedIn">
                        |
                        <router-link :to="'/product-types/edit/' + item.id"
                            >Edit</router-link
                        >
                        |
                        <router-link :to="'/product-types/delete/' + item.id"
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
import { IProductType } from "@/domain/IProduct-Type";

@Options({
    components: {},
    props: {},
})
export default class ProductTypeIndex extends Vue {
    productTypes: IProductType[] | null = null;

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
        const service = new BaseService<IProductType>(
            "https://localhost:5001/api/v1/ProductTypes",
            store.state.token ? store.state.token : undefined
        );
        service.getAll().then((data) => {
            this.productTypes = data.data!;
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
