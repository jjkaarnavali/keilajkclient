<template>
    <h1>Create</h1>

    <h4>Person</h4>
    <hr />
    <div class="row">
        <div class="col-md-4">
            <div class="form-group">
                <label  for="firstName">First name</label>
                <input
                    class="form-control"
                    id="Input_FirstName"
                    v-model="firstName"
                />
            </div>
            <div class="form-group">
                <label  for="lastName">Last name</label>
                <input
                    class="form-control"
                    id="Input_LastName"
                    v-model="lastName"
                />
            </div>
            <div class="form-group">
                <label for="Input_PersonsIdCode">ID code</label>
                <input
                    class="form-control"
                    id="Input_PersonsIdCode"
                    v-model="personsIdCode"
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
        <router-link :to="'/persons/'">Back to List</router-link>
    </div>
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
export default class PersonsCreate extends Vue {
    id: undefined;
    firstName: string = "";
    lastName: string = "";
    personsIdCode: string = "";

    async createClicked(event: Event): Promise<void> {
        console.log(this.firstName, this.lastName, this.personsIdCode);
        const service = new BaseService<IPerson>(
            "https://jakaar.azurewebsites.net/api/v1/Persons",
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

        const objToCreate: IPerson = {
            id:
            this.id,
            firstName:
            this.firstName,
            lastName:
            this.lastName,
            personsIdCode:
            this.personsIdCode,
            appUserId:
            userId
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
