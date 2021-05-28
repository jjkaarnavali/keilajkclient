<template>
<h1>Delete</h1>

<h3>Are you sure you want to delete this?</h3>
<div>
    <h4>Price</h4>
    <hr />
    <dl class="row">
        <dt class = "col-sm-2">
            Product
        </dt>
        <dd class = "col-sm-10">
            {{product.productId}}
        </dd>
        <dd class = "col-sm-10">
            {{product.priceInEur}}
        </dd>
    </dl>

    <div class="form-group">
        <button @click="deleteClicked($event)" type="submit" class="btn btn-danger">Delete</button>|
        <router-link :to="'/prices/'">Back to List</router-link>
    </div>
</div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import store from "@/store/index";
import { BaseService } from "@/services/base-service";
import { IPrice } from "@/domain/IPrice";

@Options({
    components: {},
    props: {
        id: String,
    },
})
export default class PricesDelete extends Vue {
    id!: string;
    price: IPrice = {
        id: "",
        productId: "",
        discountId: "",
        priceInEur: "",
        until: undefined
    };

    async deleteClicked(event: Event): Promise<void> {
        const service = new BaseService<IPrice>(
            "https://localhost:5001/api/v1/Prices",
            store.state.token ? store.state.token : undefined
        );

        const objToDelete: IPrice = {
            id:
            this.price.id,
            productId:
            this.price.productId,
            discountId:
            this.price.discountId,
            priceInEur:
            this.price.priceInEur,
            until:
            undefined
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
        const service = new BaseService<IPrice>(
            "https://localhost:5001/api/v1/Prices",
            store.state.token ? store.state.token : undefined
        );
        console.log(this.id);
        console.log("lmao");
        service.get(this.id).then((data) => {
            console.log(data);
            this.price.id = data.data!.id;
            this.price.productId = data.data!.productId;
            this.price.discountId = data.data!.discountId;
            this.price.priceInEur = data.data!.priceInEur;
            this.price.until = data.data!.until;
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
