<template>
    <h1>Create</h1>

    <h4>Payment type</h4>
    <hr />
    <div class="row">
        <div class="col-md-4">
            <div class="form-group">
                <label  for="paymentTypeName">Payment type</label>
                <input
                    class="form-control"
                    id="Input_PaymentTypeName"
                    v-model="paymentTypeName"
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
        <router-link :to="'/payment-types/'">Back to List</router-link>
    </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import store from "@/store/index";
import { BaseService } from "@/services/base-service";
import { IPaymentType } from "@/domain/IPayment-Type";

@Options({
    components: {},
    props: {},
})
export default class PaymentTypesCreate extends Vue {
    id: undefined;
    paymentTypeName: string = "";

    async createClicked(event: Event): Promise<void> {
        const service = new BaseService<IPaymentType>(
            "https://localhost:5001/api/v1/PaymentTypes",
            store.state.token ? store.state.token : undefined
        );

        const objToCreate: IPaymentType = {
            id:
            this.id,
            paymentTypeName:
            this.paymentTypeName,
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
