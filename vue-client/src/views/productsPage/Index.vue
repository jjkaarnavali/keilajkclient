<template>
    <section class="py-5">
        <div class="container px-4 px-lg-5 mt-5">
            <div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                
                    <div class="col mb-5" v-for="item in products" :key="item.id">
                        <div class="card h-100">
                            <!-- Product image-->
                            <img class="card-img-top" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt="..."/>
                            <!-- Product details-->
                            <div class="card-body p-4">
                                <div class="text-center">
                                    <!-- Product name-->
                                    <h5 class="fw-bolder">{{ item.productName }}</h5>
                                    <!-- Product price-->
                                    @Html.DisplayFor(modelItem => item.Price)
                                </div>
                            </div>
                            <!-- Product actions-->
                            <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                <div class="text-center"><router-link :to="'/products/details/' + item.id"
                        >View</router-link>
                        </div>
                            </div>
                            <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                <div class="form-group">
                                    <button
                                        @click="addToCart($event)"
                                        type="submit"
                                        amount= "1"
                                        id= {{ item.id }}
                                        class="btn btn-primary"
                                    >
                                    Add to cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                
            </div>
            </div>
        </section>
    <h1>Products Index</h1>
    <router-link :to="'/products/create/'"
                        >Create new</router-link
                     >
    <table class="table">
        <thead>
            <tr>
                <th>Company ID</th>
                <th>Producttype ID</th>
                <th>ProductName</th>
                <th>ProductSize</th>
                <th>ProductSeason</th>
                <th>ProductCode</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in products" :key="item.id">
                <td>{{ item.companyId }}</td>
                <td>{{ item.productTypeId }}</td>
                <td>{{ item.productName }}</td>
                <td>{{ item.productSize }}</td>
                <td>{{ item.productSeason }}</td>
                <td>{{ item.productCode }}</td>
                <td>
                    <router-link :to="'/products/details/' + item.id"
                        >Details</router-link
                    >
                    <template v-if="isUserLoggedIn">
                        |
                        <router-link :to="'/products/edit/' + item.id"
                            >Edit</router-link
                        >
                        |
                        <router-link :to="'/products/delete/' + item.id"
                            >Delete</router-link
                        >
                    </template>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import store from "@/store/index";
import { BaseService } from "@/services/base-service";
import { IProduct } from "@/domain/IProduct";

@Options({
    components: {},
    props: {},
})
export default class ProductIndex extends Vue {
    products: IProduct[] | null = null;

    async addToCart(event: Event): Promise<void> {
        
    }

    get isUserLoggedIn(): boolean {
        return store.state.token != null;
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
        const service = new BaseService<IProduct>(
            "https://localhost:5001/api/v1/Products",
            store.state.token ? store.state.token : undefined
        );
        service.getAll().then((data) => {
            this.products = data.data!;
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
