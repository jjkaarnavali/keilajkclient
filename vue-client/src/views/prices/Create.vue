<template>
    <h1>Create</h1>

    <h4>Price</h4>
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
                <label  for="discountId">Discount Id</label>
                <input
                    class="form-control"
                    id="Input_discountId"
                    v-model="discountId"
                />
                <label  for="priceInEur">Price</label>
                <input
                    class="form-control"
                    id="Input_priceInEur"
                    v-model="priceInEur"
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
    props: {},
})
export default class PriceCreate extends Vue {
    id: undefined;
    productId: string = "";
    discountId: string = "";
    priceInEur: string = "";

    async createClicked(event: Event): Promise<void> {
        const service = new BaseService<IPrice>(
            "https://localhost:5001/api/v1/Prices",
            store.state.token ? store.state.token : undefined
        );

        const objToCreate: IPrice = {
            id:
            this.id,
            productId:
            this.productId,
            discountId:
            this.discountId,
            priceInEur:
            this.priceInEur
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
