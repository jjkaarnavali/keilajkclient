<template>
    <h1>Create</h1>

    <h4>Product In Order</h4>
    <hr />
    <div class="row">
        <div class="col-md-4">
            <div class="form-group">
                <label  for="productId">Product Id</label>
                <input
                    class="form-control"
                    id="Input_productId"
                    v-model="productId"
                />
                <label  for="orderId">Order Id</label>
                <input
                    class="form-control"
                    id="Input_orderId"
                    v-model="orderId"
                />
                <label  for="productAmount">Product amount</label>
                <input
                    class="form-control"
                    id="Input_productAmount"
                    v-model="productAmount"
                />
            </div>
            <div class="form-group">
                <button
                    @click="createClicked($event)"
                    type="submit"
                    class="btn btn-primary"
                >
                    Create
                </button>
            </div>
        </div>
    </div>
    <div>
        <router-link :to="'/productsInOrders/'">Back to List</router-link>
    </div>
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
export default class ProductsInOrdersCreate extends Vue {
    id: undefined;
    productId: string = "";
    orderId: string = "";
    productAmount: string = "";
    until: undefined;

    async createClicked(event: Event): Promise<void> {
        const service = new BaseService<IProductInOrder>(
            "https://localhost:5001/api/v1/ProductsInOrders",
            store.state.token ? store.state.token : undefined
        );

        const objToCreate: IProductInOrder = {
            id:
            this.id,
            productId:
            this.productId,
            orderId:
            this.orderId,
            productAmount:
            this.productAmount,
            until:
            undefined
        };

        console.log(objToCreate);

        const response = await service.post(objToCreate);

        console.log(response);
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
