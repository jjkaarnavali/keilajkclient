<template>
<h1>Edit product</h1>

    <h4>Edit</h4>
    <hr />
    <div class="row">
        <div class="col-md-4">
            <div class="form-group">
                <label  for="companyId">Company Id</label>
                <input
                    class="form-control"
                    id="Input_companyId"
                    v-model="product.companyId"
                />
                <label  for="productTypeId">ProductType Id</label>
                <input
                    class="form-control"
                    id="Input_productTypeId"
                    v-model="product.productTypeId"
                />
                <label  for="productName">Product Name</label>
                <input
                    class="form-control"
                    id="Input_productName"
                    v-model="product.productName"
                />
                <label  for="productSize">Product Size</label>
                <input
                    class="form-control"
                    id="Input_productSize"
                    v-model="product.productSize"
                />
                <label  for="productSeason">Product Season</label>
                <input
                    class="form-control"
                    id="Input_productSeason"
                    v-model="product.productSeason"
                />
                <label  for="productCode">Product Code</label>
                <input
                    class="form-control"
                    id="Input_productCode"
                    v-model="product.productCode"
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
    props: {
        id: String,
    },
})
export default class ProductsEdit extends Vue {
    id!: string;
    product: IProduct = {
        id: "",
        companyId: "",
        productTypeId: "",
        productName: "",
        productSize: "",
        productSeason: "",
        productCode: ""
    };

    async saveClicked(event: Event): Promise<void> {
        const service = new BaseService<IProduct>(
            "https://localhost:5001/api/v1/Products",
            store.state.token ? store.state.token : undefined
        );

        const objToEdit: IProduct = {
            id:
            this.product.id,
            companyId:
            this.product.companyId,
            productTypeId:
            this.product.productTypeId,
            productName:
            this.product.productName,
            productSize:
            this.product.productSize,
            productSeason:
            this.product.productSeason,
            productCode:
            this.product.productCode
        };

        console.log(objToEdit);

        const response = await service.put(objToEdit);

        console.log(response);
    }

    beforeCreate(): void {
        console.log("beforeCreate");
        const service = new BaseService<IProduct>(
            "https://localhost:5001/api/v1/Products",
            store.state.token ? store.state.token : undefined
        );
        console.log(this.id);
        console.log("lmao");
        service.get(this.id).then((data) => {
            console.log(data);
            this.product.id = data.data!.id;
            this.product.companyId = data.data!.companyId;
            this.product.productTypeId = data.data!.productTypeId;
            this.product.productName = data.data!.productName;
            this.product.productSize = data.data!.productSize;
            this.product.productSeason = data.data!.productSeason;
            this.product.productCode = data.data!.productCode;
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
