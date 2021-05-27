<template>
<h1>Delete</h1>

<h3>Are you sure you want to delete this?</h3>
<div>
    <h4>Product In Order</h4>
    <hr />
    <dl class="row">
        <dt class = "col-sm-2">
            Product ID
        </dt>
        <dd class = "col-sm-10">
            {{productInOrder.productId}}
        </dd>
        <dt class = "col-sm-2">
            Order ID
        </dt>
        <dd class = "col-sm-10">
            {{productInOrder.orderId}}
        </dd>
        <dt class = "col-sm-2">
            Amount of product
        </dt>
        <dd class = "col-sm-10">
            {{productInOrder.productAmount}}
        </dd>
    </dl>

    <div class="form-group">
        <button @click="deleteClicked($event)" type="submit" class="btn btn-danger">Delete</button>|
        <router-link :to="'/productsInOrders/'">Back to List</router-link>
    </div>
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
export default class ProductsInOrdersDelete extends Vue {
    id!: string;
    productInOrder: IProductInOrder = {
        id: "",
        productId: "",
        orderId: "",
        productAmount: ""
    };

    async deleteClicked(event: Event): Promise<void> {
        const service = new BaseService<IProductInOrder>(
            "https://localhost:5001/api/v1/ProductsInOrders",
            store.state.token ? store.state.token : undefined
        );

        const objToDelete: IProductInOrder = {
            id:
            this.productInOrder.id,
            productId:
            this.productInOrder.productId,
            orderId:
            this.productInOrder.orderId,
            productAmount:
            this.productInOrder.productAmount
        };

        console.log(objToDelete);

        const response = await service.delete(objToDelete);

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
