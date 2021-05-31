<template>
    <h1>Details</h1>

    <div>
        <h4>Order</h4>
        <hr />
        <dl class="row" >
        <dt class="col-sm-4">
            Id
        </dt>
        <dd class="col-sm-8">
            {{order.id}}
        </dd>
        <dt class="col-sm-4">
            user ID
        </dt>
        <dd class="col-sm-8">
            {{order.userId}}
        </dd>
    </dl>
    </div>
    <div>
        <router-link :to="'/orders/edit/' + order.id">Edit</router-link> |

        <router-link :to="'/orders/'">Back to List</router-link>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import store from "@/store/index";
import { BaseService } from "@/services/base-service";
import { IOrder } from "@/domain/IOrder";
import { data } from "node_modules/@types/jquery";

@Options({
    components: {},
    props: {
        id: String,
    },
})
export default class OrdersDetails extends Vue {
    id!: string;
    order: IOrder = {
        id: "",
        userId: "",
        until: undefined
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
