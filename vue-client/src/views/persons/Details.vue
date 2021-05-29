<template>
    <h1>Details</h1>

    <div>
        <h4>Persons</h4>
        <hr />
        <dl class="row" >
        <dt class="col-sm-4">
            FirstName
        </dt>
        <dd class="col-sm-8">
            {{person.firstName}}
        </dd>
        <dt class="col-sm-4">
            LastName
        </dt>
        <dd class="col-sm-8">
            {{person.lastName}}
        </dd>
        <dt class="col-sm-4">
            ID code
        </dt>
        <dd class="col-sm-8">
            {{person.personsIdCode}}
        </dd>
    </dl>
    </div>
    <div>
        <router-link :to="'/persons/edit/' + person.id">Edit</router-link> |

        <router-link :to="'/persons/'">Back to List</router-link>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import store from "@/store/index";
import { BaseService } from "@/services/base-service";
import { IPerson } from "@/domain/IPerson";
import { data } from "node_modules/@types/jquery";

@Options({
    components: {},
    props: {
        id: String,
    },
})
export default class PersonsDetails extends Vue {
    id!: string;
    person: IPerson = {
        id: "",
        firstName: "",
        lastName: "",
        personsIdCode: "",
        appUserId: ""
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
