<template>
    <h1>Create</h1>

    <h4>Product</h4>
    <hr />
    <div class="row">
        <div class="col-md-4">
            <div class="form-group">
                <label  for="companyId">Company Id</label>
                <input
                    class="form-control"
                    id="Input_companyId"
                    v-model="companyId"
                />
                <label  for="productTypeId">ProductType Id</label>
                <input
                    class="form-control"
                    id="Input_productTypeId"
                    v-model="productTypeId"
                />
                <label  for="productName">Product Name</label>
                <input
                    class="form-control"
                    id="Input_productName"
                    v-model="productName"
                />
                <label  for="productSize">Product Size</label>
                <input
                    class="form-control"
                    id="Input_productSize"
                    v-model="productSize"
                />
                <label  for="productSeason">Product Season</label>
                <input
                    class="form-control"
                    id="Input_productSeason"
                    v-model="productSeason"
                />
                <label  for="productCode">Product Code</label>
                <input
                    class="form-control"
                    id="Input_productCode"
                    v-model="productCode"
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
        <router-link :to="'/products/'">Back to List</router-link>
    </div>
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
export default class ProductsCreate extends Vue {
    id: undefined;
    companyId: string = "";
    productTypeId: string = "";
    productName: string = "";
    productSize: string = "";
    productSeason: string = "";
    productCode: string = "";

    async createClicked(event: Event): Promise<void> {
        const service = new BaseService<IProduct>(
            "https://localhost:5001/api/v1/Products",
            store.state.token ? store.state.token : undefined
        );

        const objToCreate: IProduct = {
            id:
            this.id,
            companyId:
            this.companyId,
            productTypeId:
            this.productTypeId,
            productName:
            this.productName,
            productSize:
            this.productSize,
            productSeason:
            this.productSeason,
            productCode:
            this.productCode
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
