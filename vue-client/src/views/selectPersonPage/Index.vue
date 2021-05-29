<template>
    <h1>Persons</h1>

    <p>
        <router-link :to="'/selectPersonPage/create/'"
            >Create new</router-link
        >
    </p>
    <table class="table">
        <thead>
        <tr>
            <th>
                First name
            </th>
            <th>
                Last name
            </th>
            <th>
                ID code
            </th>
            <th></th>
        </tr>
        </thead>
        <tbody v-for="person in usersPersons" :key="person.id">
            <tr>
                <td>
                    {{person.firstName}}
                </td>
                <td>
                    {{person.lastName}}
                </td>
                <td>
                    {{person.personsIdCode}}
                </td>
                <td>
                    <a asp-controller="PurchasePage" asp-action="Index" asp-route-personId="@item.Id">Select</a> |
                    <button
                        type="submit"
                        class="btn btn-primary"
                    >
                        <router-link
                            :to="'/purchasePage/Index/' + person.id"
                            class="nav-link text-light"
                            >Select</router-link
                        >
                    </button>
                    <button
                        @click="remove($event, person.id)"
                        type="submit"
                        class="btn btn-primary"
                    >
                        <router-link
                            to="/selectPersonPage/Index"
                            class="nav-link text-light"
                            >Remove</router-link
                        >
                    </button>
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
import { IPrice } from "@/domain/IPrice";
import { IOrder } from "@/domain/IOrder";
import { IPerson } from "@/domain/IPerson";
import { IProductInOrder } from "@/domain/IProductInOrder";

@Options({
    components: {},
    props: {},
})
export default class SelectPersonPageIndex extends Vue {
    products: IProduct[] | null = null;
    persons: IPerson[] | null = null;
    usersPersons: IPerson[] | null = null;
    prices: IPrice[] | null = null;
    orders: IOrder[] | null = null;
    productsInOrders: IProductInOrder[] | null = null;

    async remove(event: Event, id: string): Promise<void> {
        const personService = new BaseService<IPerson>(
            "https://localhost:5001/api/v1/Persons",
            store.state.token ? store.state.token : undefined
        );

        var personToRemove = (await personService.get(id)).data;
        console.log(personToRemove);
        await personService.delete(personToRemove!);
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
        const service = new BaseService<IPerson>(
            "https://localhost:5001/api/v1/Persons",
            store.state.token ? store.state.token : undefined
        );

        var token = store.state.token;
        var base64Url = token!.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        var decodedToken = JSON.parse(jsonPayload);
        var userId = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];

        service.getAll().then((data) => {
            this.persons = data.data!;

            this.usersPersons = this.persons!.filter(x => x.appUserId === userId);
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
