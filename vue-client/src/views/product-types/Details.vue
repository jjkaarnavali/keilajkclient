<template>
    <h1>Details</h1>

    <div>
        <h4>Product Types</h4>
        <hr />
        <dl class="row" >
        <dt class="col-sm-4">
            Product type
        </dt>
        <dd class="col-sm-8">
            {{productType.typeName}}
        </dd>
        <dt class="col-sm-4">
            Id
        </dt>
        <dd class="col-sm-8">
            {{productType.id}}
        </dd>
    </dl>
    </div>
    <div>
        <router-link :to="'/product-types/edit/' + productType.id">Edit</router-link> |

        <router-link :to="'/product-types/'">Back to List</router-link>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import store from "@/store/index";
import { BaseService } from "@/services/base-service";
import { IProductType } from "@/domain/IProduct-Type";
import { data } from "node_modules/@types/jquery";

@Options({
    components: {},
    props: {
        id: String,
    },
})
export default class ProductTypesDetails extends Vue {
    id!: string;
    productType: IProductType = {
        id: "",
        typeName: ""
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
        const service = new BaseService<IProductType>(
            "https://localhost:5001/api/v1/ProductTypes",
            store.state.token ? store.state.token : undefined
        );
        console.log(this.id);
        console.log("lmao");
        service.get(this.id).then((data) => {
            console.log(data);
            this.productType.id = data.data!.id;
            this.productType.typeName = data.data!.typeName;
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
