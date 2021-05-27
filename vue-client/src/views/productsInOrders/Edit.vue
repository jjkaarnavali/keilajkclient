<template>
<h1>Edit product in order</h1>

    <h4>Edit</h4>
    <hr />
    <div class="row">
        <div class="col-md-4">
            <div class="form-group">
                <label  for="productId">Product Id</label>
                <input
                    class="form-control"
                    id="Input_productId"
                    v-model="productInOrder.productId"
                />
                <label  for="orderId">Order Id</label>
                <input
                    class="form-control"
                    id="Input_orderId"
                    v-model="productInOrder.orderId"
                />
                <label  for="productAmount">Product Amount</label>
                <input
                    class="form-control"
                    id="Input_productAmount"
                    v-model="productInOrder.productAmount"
                />
            </div>
            <div class="form-group">
                <button
                    @click="saveClicked($event)"
                    type="submit"
                    class="btn btn-primary"
                >
                    Save
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
    props: {
        id: String,
    },
})
export default class ProductsInOrdersEdit extends Vue {
    id!: string;
    productInOrder: IProductInOrder = {
        id: "",
        productId: "",
        orderId: "",
        productAmount: ""
    };

    async saveClicked(event: Event): Promise<void> {
        const service = new BaseService<IProductInOrder>(
            "https://localhost:5001/api/v1/ProductsInOrders",
            store.state.token ? store.state.token : undefined
        );

        const objToEdit: IProductInOrder = {
            id:
            this.productInOrder.id,
            productId:
            this.productInOrder.productId,
            orderId:
            this.productInOrder.orderId,
            productAmount:
            this.productInOrder.productAmount
        };

        console.log(objToEdit);

        const response = await service.put(objToEdit);

        console.log(response);
    }

    beforeCreate(): void {
        console.log("beforeCreate");
        const service = new BaseService<IProductInOrder>(
            "https://localhost:5001/api/v1/ProductsInOrders",
            store.state.token ? store.state.token : undefined
        );
        console.log(this.id);
        console.log("lmao");
        service.get(this.id).then((data) => {
            console.log(data);
            this.productInOrder.id = data.data!.id;
            this.productInOrder.productId = data.data!.productId;
            this.productInOrder.orderId = data.data!.orderId;
            this.productInOrder.productAmount = data.data!.productAmount;
        });
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
