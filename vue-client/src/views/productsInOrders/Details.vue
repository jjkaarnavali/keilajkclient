<template>
    <h1>Details</h1>

    <div>
        <h4>Product In Order</h4>
        <hr />
        <dl class="row" >
        <dt class="col-sm-4">
            Product ID
        </dt>
        <dd class="col-sm-8">
            {{productInOrder.productId}}
        </dd>
        <dt class="col-sm-4">
            Order ID
        </dt>
        <dd class="col-sm-8">
            {{productInOrder.orderId}}
        </dd>
        <dt class="col-sm-4">
            Product Amount
        </dt>
        <dd class="col-sm-8">
            {{productInOrder.productAmount}}
        </dd>
    </dl>
    </div>
    <div>
        <router-link :to="'/productsInOrders/edit/' + productInOrder.id">Edit</router-link> |

        <router-link :to="'/productsInOrders/'">Back to List</router-link>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import store from "@/store/index";
import { BaseService } from "@/services/base-service";
import { IProductInOrder } from "@/domain/IProductInOrder";
import { data } from "node_modules/@types/jquery";

@Options({
    components: {},
    props: {
        id: String,
    },
})
export default class ProductsInOrdersDetails extends Vue {
    id!: string;
    productInOrder: IProductInOrder = {
        id: "",
        productId: "",
        orderId: "",
        productAmount: ""
    };

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
