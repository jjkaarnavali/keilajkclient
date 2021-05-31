<template>
<h1>Edit payment type</h1>

    <h4>Edit</h4>
    <hr />
    <div class="row">
        <div class="col-md-4">
            <div class="form-group">
                <label  for="paymentTypeName">Payment Type</label>
                <input
                    class="form-control"
                    id="Input_PaymentTypeName"
                    v-model="paymentType.paymentTypeName"
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
    props: {
        id: String,
    },
})
export default class PaymentTypesEdit extends Vue {
    id!: string;
    paymentType: IPaymentType = {
        id: "",
        paymentTypeName: ""
    };

    async saveClicked(event: Event): Promise<void> {
        const service = new BaseService<IPaymentType>(
            "https://jakaar.azurewebsites.net/api/v1/PaymentTypes",
            store.state.token ? store.state.token : undefined
        );

        const objToEdit: IPaymentType = {
            id:
            this.paymentType.id,
            paymentTypeName:
            this.paymentType.paymentTypeName
        };

        console.log(objToEdit);

        const response = await service.put(objToEdit);

        console.log(response);
    }

    beforeCreate(): void {
        console.log("beforeCreate");
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
