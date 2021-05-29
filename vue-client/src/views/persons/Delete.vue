<template>
<h1>Delete</h1>

<h3>Are you sure you want to delete this?</h3>
<div>
    <h4>Person</h4>
    <hr />
    <dl class="row">
        <dt class = "col-sm-2">
            FirstName
        </dt>
        <dd class = "col-sm-10">
            {{person.firstName}}
        </dd>
        <dt class = "col-sm-2">
            LastName
        </dt>
        <dd class = "col-sm-10">
            {{person.lastName}}
        </dd>
        <dt class = "col-sm-2">
            PersonsIdCode
        </dt>
        <dd class = "col-sm-10">
            {{person.personsIdCode}}
        </dd>
    </dl>

    <div class="form-group">
        <button @click="deleteClicked($event)" type="submit" class="btn btn-danger">Delete</button>|
        <router-link :to="'/persons/'">Back to List</router-link>
    </div>
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
export default class PersonsDelete extends Vue {
    id!: string;
    person: IPerson = {
        id: "",
        firstName: "",
        lastName: "",
        personsIdCode: "",
        appUserId: ""
    };

    async deleteClicked(event: Event): Promise<void> {
        const service = new BaseService<IPerson>(
            "https://localhost:5001/api/v1/Persons",
            store.state.token ? store.state.token : undefined
        );

        const objToDelete: IPerson = {
            id:
            this.person.id,
            firstName:
            this.person.firstName,
            lastName:
            this.person.lastName,
            personsIdCode:
            this.person.personsIdCode,
            appUserId:
            undefined
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
            this.person.appUserId = data.data!.appUserId;
            console.log(this.person);
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
