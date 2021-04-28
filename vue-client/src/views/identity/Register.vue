<template>
    <h1>Register</h1>

<div class="row">
    <div class="col-md-4">
            <h4>Create a new account.</h4>
            <hr />
            <div class="text-danger validation-summary-valid" data-valmsg-summary="true"><ul><li style="display:none"></li>
</ul></div>
            <div class="form-group">
                <label for="Input_Email">Email</label>
                <input v-model="email" class="form-control" type="email" data-val="true" data-val-email="The Email field is not a valid e-mail address." data-val-required="The Email field is required." id="Input_Email" name="Input.Email" />
                <span class="text-danger field-validation-valid" data-valmsg-for="Input.Email" data-valmsg-replace="true"></span>
            </div>
            <div class="form-group">
                <label for="Input_Password">Password</label>
                <input v-model="password" class="form-control" type="password" data-val="true" data-val-length="The field Password must be a string with a minimum length of 6 and a maximum length of 100." data-val-length-max="100" data-val-length-min="6" data-val-required="The Password field is required." id="Input_Password" maxlength="100" name="Input.Password" />
                <span class="text-danger field-validation-valid" data-valmsg-for="Input.Password" data-valmsg-replace="true"></span>
            </div>
            <div class="form-group">
                <label for="Input_ConfirmPassword">Confirm Password</label>
                <input class="form-control" type="password" data-val="true" data-val-equalto="The password and confirmation password do not match." data-val-equalto-other="*.Password" id="Input_ConfirmPassword" name="Input.ConfirmPassword" />
                <span class="text-danger field-validation-valid" data-valmsg-for="Input.ConfirmPassword" data-valmsg-replace="true"></span>
            </div>
            <div class="form-group">
                <label for="Input_FirstName">First Name</label>
                <input v-model="firstName" class="form-control" type="text" data-val="true" data-val-length="The field First Name must be a string with a minimum length of 1 and a maximum length of 128." data-val-length-max="128" data-val-length-min="1" data-val-maxlength="The field First Name must be a string or array type with a maximum length of &#x27;128&#x27;." data-val-maxlength-max="128" data-val-required="The First Name field is required." id="Input_FirstName" maxlength="128" name="Input.FirstName" />
                <span class="text-danger field-validation-valid" data-valmsg-for="Input.FirstName" data-valmsg-replace="true"></span>
            </div>
            <div class="form-group">
                <label for="Input_LastName">Last Name</label>
                <input v-model="lastName" class="form-control" type="text" data-val="true" data-val-length="The field Last Name must be a string with a minimum length of 1 and a maximum length of 128." data-val-length-max="128" data-val-length-min="1" data-val-maxlength="The field Last Name must be a string or array type with a maximum length of &#x27;128&#x27;." data-val-maxlength-max="128" data-val-required="The Last Name field is required." id="Input_LastName" maxlength="128" name="Input.LastName" />
                <span class="text-danger field-validation-valid" data-valmsg-for="Input.LastName" data-valmsg-replace="true"></span>
            </div>
            <div class="form-group">
                <label for="Input_UserLevel">User level</label>
                <input v-model="userlevel" class="form-control" type="text" data-val="true" data-val-length="The field User level must be a string with a minimum length of 1 and a maximum length of 2." data-val-length-max="2" data-val-length-min="1" data-val-maxlength="The field User level must be a string or array type with a maximum length of &#x27;1&#x27;." data-val-maxlength-max="1" data-val-required="The User level field is required." id="Input_UserLevel" maxlength="1" name="Input.UserLevel"/>
                <span class="text-danger field-validation-valid" data-valmsg-for="Input.UserLevel" data-valmsg-replace="true"></span>
            </div>
            <button @click="registerClicked($event)" type="submit" class="btn btn-primary">Register</button>
        <input name="__RequestVerificationToken" type="hidden" value="CfDJ8E7aXoJBzExOsnhqYuBQ2ooCgouXHApxEaG_G1GK47Lm-DfA6vS99WVP9b_aCM5XkKDo2KPTPLNETTGCA1ixFjJKBiffupX6yOaBVokx-xStflGtgo1Q9aZUT7ZsXPAa1jFHybX43uYalLXvCP-3K0A" />
    </div>
    <div class="col-md-6 col-md-offset-2">
    </div>
</div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import store from "@/store/index";
import router from "vue-router";

@Options({
    components: {},
    props: {},
})
export default class Register extends Vue {
    email: string = "";
    password: string = "";
    firstname: string = "";
    lastname: string = "";
    userlevel: string = "";

    async registerClicked(event: Event): Promise<void> {
        console.log(this.email, this.password, event);

        store
            .dispatch("register", { email: this.email, password: this.password, firstname: this.firstname, lastname: this.lastname, userlevel: this.userlevel })
            .then(() => {
                if (store.state.token != null) {
                    this.$router.push("/");
                }
            });
    }
}
</script>
