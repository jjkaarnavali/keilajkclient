
<template if.bind="state.appInitialized">
    <header>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <div class="container px-4 px-lg-5">
                    <a class="navbar-brand" href="#!">{{state.baseLangResources.commons.shop}}</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
                            <li class="nav-item">
                                <a class="dropdown-item" asp-area="" asp-controller="Home" asp-action="Index">{{state.baseLangResources.commons.home}}</a>
                            </li>
                            <li class="nav-item">
                                <router-link class="nav-link text-dark" to="/productsPage/Index/"
                                >{{state.baseLangResources.commons.products}}</router-link>
                            </li>
                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle text-dark" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    {{state.baseLangResources.commons.shop}}
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
                                <router-link class="nav-link text-dark" to="/orders/"
                                >Orders</router-link>
                                <router-link class="nav-link text-dark" to="/productsInOrders/"
                                >Products In Orders</router-link>
                                </div>
                            </li>
                            <li class="nav-item dropdown show">
                                <a class="nav-link dropdown-toggle text-dark" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">{{state.langResources.views.shared.layout.languages}}</a>
                                <div class="dropdown-menu show" aria-labelledby="navbarDropdown">
                                    <a v-for="lang in state.supportedLanguages" :key="lang" @click="changeLanguage(lang, $event)" class="dropdown-item text-dark" href="#">{{lang.nativeName}}</a>
                                </div>
                            </li>

                        </ul>
                        <ul v-if="token == null" class="navbar-nav">
                        <li class="nav-item">
                            <router-link
                                to="/identity/login"
                                class="nav-link text-dark"
                                >{{state.baseLangResources.commons.login}}</router-link
                            >
                        </li>
                    </ul>
                    <ul v-if="token == null" class="navbar-nav">
                        <li class="nav-item">
                            <router-link
                                to="/identity/register"
                                class="nav-link text-dark"
                                >{{state.baseLangResources.commons.register}}</router-link
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
                                {{state.baseLangResources.commons.logout}}</a
                            >
                        </li>
                    </ul>
                        <form class="d-flex">
                            <button class="btn btn-outline-dark" type="submit" >
                                <i class="bi-cart-fill me-1" ></i>
                                <router-link
                                to="/CartPage/Index"
                                class="nav-link text-dark"
                                >{{state.baseLangResources.commons.cart}}</router-link
                                >
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
        <div class="container">Vue demo {{state.currentLanguage}}</div>
    </footer>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import store, { IState } from "@/store/index";
import { LangService } from "@/services/lang-service";
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { ISupportedLanguage } from './domain/ISupportedLanguage';
import { ILangResources } from './domain/ILangResources';
import { IBaseLangResources } from './domain/IBaseLangResources';

@Options({
    // Do not forget to register imported components!!!!!
    components: {},
})
export default class App extends Vue {
    get token(): string | null {
        return store.state.token;
    }

    private state: IState = {
        token: "",
        firstname: "",
        lastname: "",
        supportedLanguages: [],
        currentLanguage: { name: 'et', nativeName: 'eesti' },
        langResources: {
            views: {
                shared: {
                    layout: {
                        languages: "Select language"
                    }
                }
            }
        },
        baseLangResources: {
            commons: {
                askForDeleteConfirmation: "",
                back: "",
                buy: "",
                cart: "",
                create: "",
                edit: "",
                details: "",
                delete: "",
                home: "",
                logout: "",
                login: "",
                register: "",
                products: "",
                save: "",
                select: "",
                thanksForOrdering: "",
                purchase: "",
                remove: "",
                shop: "",
                addToCart: "",
                view: "",
                totalPrice: "",
                productName: "",
                productAmount: "",
                price: "",
                firstName: "",
                lastName: "",
                idCode: "",
                person: "",
                createPerson: "",
                paymentTypeName: ""
            }
        },
        appInitialized: true
    };

    private langService = new LangService(
        "https://localhost:5001/api/v1/lang",
        store.state.token ? store.state.token : undefined
    );

    async mounted() {
        await this.langService.getLangResources("/GetLangResources", this.state.currentLanguage.name).then(
            response => {
                // console.log(response);
                if (response.statusCode === 200) {
                    this.state.langResources = response.data as ILangResources;
                }
            }
        );

        await this.langService.getBaseLangResources("/GetBaseLangResources", this.state.currentLanguage.name).then(
            response => {
                // console.log(response);
                if (response.statusCode === 200) {
                    this.state.baseLangResources = response.data as IBaseLangResources;
                    this.state.appInitialized = true;
                }
            }
        );

        await this.langService.getSupportedLanguages("/GetSupportedLanguages", this.state.currentLanguage.name).then(
            response => {
                // console.log(response);
                if (response.statusCode === 200) {
                    this.state.supportedLanguages = response.data as ISupportedLanguage[];
                }
            }
        );

        // console.log(this.state);
    }

    changeLanguage(lang: ISupportedLanguage, e: Event) {
        this.state.currentLanguage = lang;
        store.state.currentLanguage = lang;
        console.log("changeing language");
        console.log(lang);

        this.langService.getLangResources("/GetLangResources", this.state.currentLanguage.name).then(
            response => {
                console.log(response);
                if (response.statusCode === 200) {
                    this.state.langResources = response.data as ILangResources;
                    store.state.langResources = response.data as ILangResources;
                }
            }
        );

        this.langService.getBaseLangResources("/GetBaseLangResources", this.state.currentLanguage.name).then(
            response => {
                console.log(response);
                if (response.statusCode === 200) {
                    this.state.baseLangResources = response.data as IBaseLangResources;
                    store.state.baseLangResources = response.data as IBaseLangResources;
                }
            }
        );
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
