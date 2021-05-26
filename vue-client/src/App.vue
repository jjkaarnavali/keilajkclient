<template>
    <header>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <div class="container px-4 px-lg-5">
                    <a class="navbar-brand" href="#!">Pood</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
                            <li class="nav-item">
                                <a class="dropdown-item" asp-area="" asp-controller="Home" asp-action="Index">Home</a>
                            </li>
                            <li class="nav-item">
                                <a class="dropdown-item" asp-area="" asp-controller="ProductsPage" asp-action="Index">Products</a>
                            </li>
                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle text-dark" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Shop
                                </a>
                                <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                                <router-link class="nav-link text-dark" to="/payment-types/"
                                >Payment Types</router-link>
                                <router-link class="nav-link text-dark" to="/persons/"
                                >Persons</router-link>
                                <router-link class="nav-link text-dark" to="/product-types/"
                                >Product Types</router-link>
                                <router-link class="nav-link text-dark" to="/products/"
                                >Products</router-link>
                                <router-link class="nav-link text-dark" to="/prices/"
                                >Prices</router-link>
                                </div>
                            </li>
                        </ul>
                        <ul v-if="token == null" class="navbar-nav">
                        <li class="nav-item">
                            <router-link
                                to="/identity/login"
                                class="nav-link text-dark"
                                >Login</router-link
                            >
                        </li>
                    </ul>
                    <ul v-if="token == null" class="navbar-nav">
                        <li class="nav-item">
                            <router-link
                                to="/identity/register"
                                class="nav-link text-dark"
                                >Register</router-link
                            >
                        </li>
                    </ul>
                    <ul v-if="token != null" class="navbar-nav">
                        <li class="nav-item">
                            <a
                                href="#"
                                class="nav-link text-dark"
                                @click="logOut()"
                            >
                                Logout</a
                            >
                        </li>
                    </ul>
                        <form class="d-flex">
                            <button class="btn btn-outline-dark" type="submit" >
                                <i class="bi-cart-fill me-1" ></i>
                                Cart
                            </button>
                        </form>
                    </div>
                </div>
            </nav>
            <header class="bg-dark py-5">
        <div class="container px-4 px-lg-5 my-5">
            <div class="text-center text-white">
                <h1 class="display-4 fw-bolder">Keila JK</h1>
                <p class="lead fw-normal text-white-50 mb-0">e-pood</p>
            </div>
        </div>
    </header>
    </header>
    <div class="container">
        <main role="main" class="pb-3">
            <router-view />
        </main>
    </div>

    <footer class="border-top footer text-muted">
        <div class="container">Vue demo</div>
    </footer>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import store from "@/store/index";

@Options({
    // Do not forget to register imported components!!!!!
    components: {},
})
export default class App extends Vue {
    get token(): string | null {
        return store.state.token;
    }

    logOut(): void {
        store.commit("logOut");
        this.$router.push('/');
    }
}
</script>

<style>
a.navbar-brand {
    white-space: normal;
    text-align: center;
    word-break: break-all;
}

/* Provide sufficient contrast against white background */
a {
    color: #0366d6;
}

.btn-primary {
    color: #fff;
    background-color: #1b6ec2;
    border-color: #1861ac;
}

.nav-pills .nav-link.active,
.nav-pills .show > .nav-link {
    color: #fff;
    background-color: #1b6ec2;
    border-color: #1861ac;
}

/* Sticky footer styles
-------------------------------------------------- */
html {
    font-size: 14px;
}
@media (min-width: 768px) {
    html {
        font-size: 16px;
    }
}

.border-top {
    border-top: 1px solid #e5e5e5;
}
.border-bottom {
    border-bottom: 1px solid #e5e5e5;
}

.box-shadow {
    box-shadow: 0 0.25rem 0.75rem rgba(0, 0, 0, 0.05);
}

button.accept-policy {
    font-size: 1rem;
    line-height: inherit;
}

/* Sticky footer styles
-------------------------------------------------- */
html {
    position: relative;
    min-height: 100%;
}

body {
    /* Margin bottom by footer height */
    margin-bottom: 60px;
}
.footer {
    position: absolute;
    bottom: 0;
    width: 100%;
    white-space: nowrap;
    line-height: 60px; /* Vertically center the text there */
}
</style>
