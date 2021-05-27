<template>
    <h1>Orders Index</h1>
    <router-link :to="'/orders/create/'"
                        >Create new</router-link
                     >
    <table class="table">
        <thead>
            <tr>
                <th>Order ID</th>
                <th>User ID</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in orders" :key="item.id">
                <td>{{ item.id }}</td>
                <td>{{ item.userId }}</td>
                <td>
                    <router-link :to="'/orders/details/' + item.id"
                        >Details</router-link
                    >
                    <template v-if="isUserLoggedIn">
                        |
                        <router-link :to="'/orders/edit/' + item.id"
                            >Edit</router-link
                        >
                        |
                        <router-link :to="{ name: 'orders-delete', params: { id: item.id }}"
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
import { IOrder } from "@/domain/IOrder";

@Options({
    components: {},
    props: {},
})
export default class OrdersIndex extends Vue {
    orders: IOrder[] | null = null;

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
        const service = new BaseService<IOrder>(
            "https://localhost:5001/api/v1/Orders",
            store.state.token ? store.state.token : undefined
        );
        service.getAll().then((data) => {
            this.orders = data.data!;
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
