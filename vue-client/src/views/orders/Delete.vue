<template>
<h1>Delete</h1>

<h3>Are you sure you want to delete this?</h3>
<div>
    <h4>Order</h4>
    <hr />
    <dl class="row">
        <dt class = "col-sm-2">
            User Id
        </dt>
        <dd class = "col-sm-10">
            {{order.userId}}
        </dd>
        <dt class = "col-sm-2">
            Id
        </dt>
        <dd class = "col-sm-10">
            {{order.id}}
        </dd>
    </dl>

    <div class="form-group">
        <button @click="deleteClicked($event)" type="submit" class="btn btn-danger">Delete</button>|
        <router-link :to="'/orders/'">Back to List</router-link>
    </div>
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
export default class OrdersDelete extends Vue {
    id!: string;
    order: IOrder = {
        id: "",
        userId: "",
        until: undefined
    };

    async deleteClicked(event: Event): Promise<void> {
        const service = new BaseService<IOrder>(
            "jakaar.azurewebsites.net/api/v1/Orders",
            store.state.token ? store.state.token : undefined
        );

        const objToDelete: IOrder = {
            id:
            this.order.id,
            userId:
            this.order.userId,
            until:
            undefined
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
