<template>
<h1>Edit price</h1>

    <h4>Edit</h4>
    <hr />
    <div class="row">
        <div class="col-md-4">
            <div class="form-group">
                <label  for="productId">Product Id</label>
                <input
                    class="form-control"
                    id="Input_ProductId"
                    v-model="price.productId"
                />
                <label  for="discountId">Discount Id</label>
                <input
                    class="form-control"
                    id="Input_DiscountId"
                    v-model="price.discountId"
                />
                <label  for="priceInEur">Price</label>
                <input
                    class="form-control"
                    id="Input_PriceInEur"
                    v-model="price.priceInEur"
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
        <router-link :to="'/prices/'">Back to List</router-link>
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
export default class PricesEdit extends Vue {
    id!: string;
    price: IPrice = {
        id: "",
        productId: "",
        discountId: "",
        priceInEur: "",
        until: undefined
    };

    async saveClicked(event: Event): Promise<void> {
        const service = new BaseService<IPrice>(
            "https://localhost:5001/api/v1/Prices",
            store.state.token ? store.state.token : undefined
        );

        const objToEdit: IPrice = {
            id:
            this.id,
            productId:
            this.price.productId,
            discountId:
            this.price.discountId,
            priceInEur:
            this.price.priceInEur,
            until:
            undefined
        };

        console.log(objToEdit);

        const response = await service.put(objToEdit);

        console.log(response);
    }

    beforeCreate(): void {
        console.log("beforeCreate");
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
            console.log(data.data!.productId);
            console.log(this.price.productId);
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
