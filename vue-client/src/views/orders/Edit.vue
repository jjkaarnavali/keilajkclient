<template>
<h1>Edit order</h1>

    <h4>Edit</h4>
    <hr />
    <div class="row">
        <div class="col-md-4">
            <div class="form-group">
                <label  for="userId">User ID</label>
                <input
                    class="form-control"
                    id="Input_UserId"
                    v-model="order.userId"
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
    props: {
        id: String,
    },
})
export default class OrdersEdit extends Vue {
    id!: string;
    order: IOrder = {
        id: "",
        userId: "",
        until: undefined
    };

    async saveClicked(event: Event): Promise<void> {
        const service = new BaseService<IOrder>(
            "https://jakaar.azurewebsites.net/api/v1/Orders",
            store.state.token ? store.state.token : undefined
        );

        const objToEdit: IOrder = {
            id:
            this.order.id,
            userId:
            this.order.userId,
            until:
            undefined
        };

        console.log(objToEdit);

        const response = await service.put(objToEdit);

        console.log(response);
    }

    beforeCreate(): void {
        console.log("beforeCreate");
        const service = new BaseService<IOrder>(
            "https://jakaar.azurewebsites.net/api/v1/Orders",
            store.state.token ? store.state.token : undefined
        );
        console.log(this.id);
        console.log("lmao");
        service.get(this.id).then((data) => {
            this.order.id = data.data!.id;
            this.order.userId = data.data!.userId;
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
