<template>
<h1>Edit person</h1>

    <h4>Edit</h4>
    <hr />
    <div class="row">
        <div class="col-md-4">
            <div class="form-group">
                <label  for="firstName">First name</label>
                <input
                    class="form-control"
                    id="Input_FirstName"
                    v-model="person.firstName"
                />
            </div>
            <div class="form-group">
                <label  for="lastName">Last name</label>
                <input
                    class="form-control"
                    id="Input_LastName"
                    v-model="person.lastName"
                />
            </div>
            <div class="form-group">
                <label for="Input_PersonsIdCode">ID code</label>
                <input
                    class="form-control"
                    id="Input_PersonsIdCode"
                    v-model="person.personsIdCode"
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
    props: {
        id: String,
    },
})
export default class PersonsEdit extends Vue {
    id!: string;
    person: IPerson = {
        id: "",
        firstName: "",
        lastName: "",
        personsIdCode: ""
    };

    async saveClicked(event: Event): Promise<void> {
        const service = new BaseService<IPerson>(
            "https://localhost:5001/api/v1/Persons",
            store.state.token ? store.state.token : undefined
        );

        const objToEdit: IPerson = {
            id:
            this.person.id,
            firstName:
            this.person.firstName,
            lastName:
            this.person.lastName,
            personsIdCode:
            this.person.personsIdCode
        };

        console.log(objToEdit);

        const response = await service.put(objToEdit);

        console.log(response);
    }

    beforeCreate(): void {
        console.log("beforeCreate");
        const service = new BaseService<IPerson>(
            "https://localhost:5001/api/v1/Persons",
            store.state.token ? store.state.token : undefined
        );
        console.log(this.id);
        console.log("lmao");
        service.get(this.id).then((data) => {
            console.log(data);
            console.log(data.data!.firstName);
            this.person.id = data.data!.id;
            this.person.firstName = data.data!.firstName;
            this.person.lastName = data.data!.lastName;
            this.person.personsIdCode = data.data!.personsIdCode;
            console.log(this.person);
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
