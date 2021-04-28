<template>
    <h1>Persons Index</h1>
    <router-link :to="'/persons/create/'"
                        >Create new</router-link
                     >
    <table class="table">
        <thead>
            <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>ID code</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in persons" :key="item.id">
                <td>{{ item.firstName }}</td>
                <td>{{ item.lastName }}</td>
                <td>{{ item.personsIdCode }}</td>
                <td>
                    <router-link :to="'/persons/details/' + item.id"
                        >Details</router-link
                    >
                    <template v-if="isUserLoggedIn">
                        |
                        <router-link :to="'/persons/edit/' + item.id"
                            >Edit</router-link
                        >
                        |
                        <router-link :to="{ name: 'persons-delete', params: { id: item.id }}"
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
import { IPerson } from "@/domain/IPerson";

@Options({
    components: {},
    props: {},
})
export default class PersonsIndex extends Vue {
    persons: IPerson[] | null = null;

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
        service.getAll().then((data) => {
            this.persons = data.data!;
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
