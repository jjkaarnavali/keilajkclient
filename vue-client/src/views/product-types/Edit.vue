<template>
<h1>Edit product type</h1>

    <h4>Edit</h4>
    <hr />
    <div class="row">
        <div class="col-md-4">
            <div class="form-group">
                <label  for="typeName">Product Type</label>
                <input
                    class="form-control"
                    id="Input_typeName"
                    v-model="productType.typeName"
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
        <router-link :to="'/product-types/'">Back to List</router-link>
    </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import store from "@/store/index";
import { BaseService } from "@/services/base-service";
import { IProductType } from "@/domain/IProduct-Type";

@Options({
    components: {},
    props: {
        id: String,
    },
})
export default class ProductTypesEdit extends Vue {
    id!: string;
    productType: IProductType = {
        id: "",
        typeName: ""
    };

    async saveClicked(event: Event): Promise<void> {
        const service = new BaseService<IProductType>(
            "https://localhost:5001/api/v1/ProductTypes",
            store.state.token ? store.state.token : undefined
        );

        const objToEdit: IProductType = {
            id:
            this.productType.id,
            typeName:
            this.productType.typeName
        };

        console.log(objToEdit);

        const response = await service.put(objToEdit);

        console.log(response);
    }

    beforeCreate(): void {
        console.log("beforeCreate");
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
