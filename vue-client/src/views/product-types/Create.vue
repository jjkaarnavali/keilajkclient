<template>
    <h1>Create</h1>

    <h4>Product type</h4>
    <hr />
    <div class="row">
        <div class="col-md-4">
            <div class="form-group">
                <label  for="typeName">Product type</label>
                <input
                    class="form-control"
                    id="Input_typeName"
                    v-model="typeName"
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
    props: {},
})
export default class ProductTypesCreate extends Vue {
    id: undefined;
    typeName: string = "";

    async createClicked(event: Event): Promise<void> {
        const service = new BaseService<IProductType>(
            "https://localhost:5001/api/v1/ProductTypes",
            store.state.token ? store.state.token : undefined
        );

        const objToCreate: IProductType = {
            id:
            this.id,
            typeName:
            this.typeName,
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
