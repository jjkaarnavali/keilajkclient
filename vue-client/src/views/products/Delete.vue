<template>
<h1>Delete</h1>

<h3>Are you sure you want to delete this?</h3>
<div>
    <h4>Product</h4>
    <hr />
    <dl class="row">
        <dt class = "col-sm-2">
            Product
        </dt>
        <dd class = "col-sm-10">
            {{product.productName}}
        </dd>
        <dd class = "col-sm-10">
            {{product.productSize}}
        </dd>
        <dd class = "col-sm-10">
            {{product.productSeason}}
        </dd>
    </dl>

    <div class="form-group">
        <button @click="deleteClicked($event)" type="submit" class="btn btn-danger">Delete</button>|
        <router-link :to="'/products/'">Back to List</router-link>
    </div>
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
export default class ProductsDelete extends Vue {
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

    async deleteClicked(event: Event): Promise<void> {
        const service = new BaseService<IProduct>(
            "https://jakaar.azurewebsites.net/api/v1/Products",
            store.state.token ? store.state.token : undefined
        );

        const objToDelete: IProduct = {
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
