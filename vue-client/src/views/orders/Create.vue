<template>
    <h1>Create</h1>

    <h4>Order</h4>
    <hr />
    <div class="row">
        <div class="col-md-4">
            <div class="form-group">
                <label  for="userId">User Id</label>
                <input
                    class="form-control"
                    id="Input_UserId"
                    v-model="userId"
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
        <router-link :to="'/orders/'">Back to List</router-link>
    </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import store from "@/store/index";
import { BaseService } from "@/services/base-service";
import { IOrder } from "@/domain/IOrder";

@Options({
    components: {},
    props: {},
})
export default class OrdersCreate extends Vue {
    id: undefined;
    userId: string = "";

    async createClicked(event: Event): Promise<void> {
        const service = new BaseService<IOrder>(
            "https://jakaar.azurewebsites.net/api/v1/Orders",
            store.state.token ? store.state.token : undefined
        );

        const objToCreate: IOrder = {
            id:
            this.id,
            userId:
            this.userId,
            until:
            undefined
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
