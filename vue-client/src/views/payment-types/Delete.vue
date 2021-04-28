<template>
<h1>Delete</h1>

<h3>Are you sure you want to delete this?</h3>
<div>
    <h4>Payment Type</h4>
    <hr />
    <dl class="row">
        <dt class = "col-sm-2">
            Payment Type
        </dt>
        <dd class = "col-sm-10">
            {{paymentType.paymentTypeName}}
        </dd>
    </dl>

    <div class="form-group">
        <button @click="deleteClicked($event)" type="submit" class="btn btn-danger">Delete</button>|
        <router-link :to="'/payment-types/'">Back to List</router-link>
    </div>
</div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import store from "@/store/index";
import { BaseService } from "@/services/base-service";
import { IPaymentType } from "@/domain/IPayment-Type";

@Options({
    components: {},
    props: {
        id: String,
    },
})
export default class PaymentTypesDelete extends Vue {
    id!: string;
    paymentType: IPaymentType = {
        id: "",
        paymentTypeName: ""
    };

    async deleteClicked(event: Event): Promise<void> {
        const service = new BaseService<IPaymentType>(
            "https://localhost:5001/api/v1/PaymentTypes",
            store.state.token ? store.state.token : undefined
        );

        const objToDelete: IPaymentType = {
            id:
            this.paymentType.id,
            paymentTypeName:
            this.paymentType.paymentTypeName
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
        const service = new BaseService<IPaymentType>(
            "https://localhost:5001/api/v1/PaymentTypes",
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
