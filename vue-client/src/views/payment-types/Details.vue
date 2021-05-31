<template>
    <h1>Details</h1>

    <div>
        <h4>Payment Types</h4>
        <hr />
        <dl class="row" >
        <dt class="col-sm-4">
            Payment type
        </dt>
        <dd class="col-sm-8">
            {{paymentType.paymentTypeName}}
        </dd>
        <dt class="col-sm-4">
            Id
        </dt>
        <dd class="col-sm-8">
            {{paymentType.id}}
        </dd>
    </dl>
    </div>
    <div>
        <router-link :to="'/payment-types/edit/' + paymentType.id">Edit</router-link> |

        <router-link :to="'/payment-types/'">Back to List</router-link>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import store from "@/store/index";
import { BaseService } from "@/services/base-service";
import { IPaymentType } from "@/domain/IPayment-Type";
import { data } from "node_modules/@types/jquery";

@Options({
    components: {},
    props: {
        id: String,
    },
})
export default class PaymentTypesDetails extends Vue {
    id!: string;
    paymentType: IPaymentType = {
        id: "",
        paymentTypeName: ""
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
        const service = new BaseService<IPaymentType>(
            "https://jakaar.azurewebsites.net/api/v1/PaymentTypes",
            store.state.token ? store.state.token : undefined
        );
        console.log(this.id);
        console.log("lmao");
        service.get(this.id).then((data) => {
            console.log(data);
            this.paymentType.id = data.data!.id;
            this.paymentType.paymentTypeName = data.data!.paymentTypeName;
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
