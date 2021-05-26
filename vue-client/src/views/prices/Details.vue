<template>
    <h1>Details</h1>

    <div>
        <h4>Prices</h4>
        <hr />
        <dl class="row" >
        <dt class="col-sm-4">
            Price
        </dt>
        <dd class="col-sm-8">
            {{price.priceInEur}}
        </dd>
        <dt class="col-sm-4">
            Id
        </dt>
        <dd class="col-sm-8">
            {{price.id}}
        </dd>
    </dl>
    </div>
    <div>
        <router-link :to="'/prices/edit/' + price.id">Edit</router-link> |

        <router-link :to="'/prices/'">Back to List</router-link>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import store from "@/store/index";
import { BaseService } from "@/services/base-service";
import { IPrice } from "@/domain/IPrice";
import { data } from "node_modules/@types/jquery";

@Options({
    components: {},
    props: {
        id: String,
    },
})
export default class PricesDetails extends Vue {
    id!: string;
    price: IPrice = {
        id: "",
        productId: "",
        discountId: "",
        priceInEur: ""
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
        const service = new BaseService<IPrice>(
            "https://localhost:5001/api/v1/Prices",
            store.state.token ? store.state.token : undefined
        );
        console.log(this.id);
        console.log("lmao");
        service.get(this.id).then((data) => {
            console.log(data);
            this.price.id = data.data!.id;
            this.price.productId = data.data!.productId;
            this.price.discountId = data.data!.discountId;
            this.price.priceInEur = data.data!.priceInEur;
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
