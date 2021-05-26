<template>
    <h1>Details</h1>

    <div>
        <h4>Products</h4>
        <hr />
        <dl class="row" >
        <dt class="col-sm-4">
            Product
        </dt>
        <dd class="col-sm-8">
            {{product.productName}}
        </dd>
        <dt class="col-sm-4">
            Id
        </dt>
        <dd class="col-sm-8">
            {{product.Id}}
        </dd>
    </dl>
    </div>
    <div>
        <router-link :to="'/products/edit/' + product.id">Edit</router-link> |

        <router-link :to="'/products/'">Back to List</router-link>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import store from "@/store/index";
import { BaseService } from "@/services/base-service";
import { IProduct } from "@/domain/IProduct";
import { data } from "node_modules/@types/jquery";

@Options({
    components: {},
    props: {
        id: String,
    },
})
export default class ProductTypesDetails extends Vue {
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
