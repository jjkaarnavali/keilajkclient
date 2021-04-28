import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/identity/Login.vue';
import Register from '../views/identity/Register.vue';
import PersonIndex from '../views/persons/Index.vue';
import PersonDetails from '../views/persons/Details.vue';
import PersonCreate from '../views/persons/Create.vue';
import PersonEdit from '../views/persons/Edit.vue';
import PersonDelete from '../views/persons/Delete.vue';
import PaymentTypeIndex from '../views/payment-types/Index.vue';
import PaymentTypeDetails from '../views/payment-types/Details.vue';
import PaymentTypeCreate from '../views/payment-types/Create.vue';
import PaymentTypeEdit from '../views/payment-types/Edit.vue';
import PaymentTypeDelete from '../views/payment-types/Delete.vue';
import ProductTypeIndex from '../views/product-types/Index.vue';
import ProductTypeDetails from '../views/product-types/Details.vue';
import ProductTypeCreate from '../views/product-types/Create.vue';
import ProductTypeEdit from '../views/product-types/Edit.vue';
import ProductTypeDelete from '../views/product-types/Delete.vue';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
        props: true,
    },
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/identity/login',
        name: 'identity-login',
        component: Login,
    },
    {
        path: '/identity/register',
        name: 'identity-register',
        component: Register,
    },
    { path: '/persons/', name: 'persons-index', component: PersonIndex, },
    { path: '/persons/details/:id', name: 'persons-details', component: PersonDetails, props: true },
    { path: '/persons/create', name: 'persons-create', component: PersonCreate, },
    { path: '/persons/edit/:id', name: 'persons-edit', component: PersonEdit, props: true },
    { path: '/persons/delete/:id', name: 'persons-delete', component: PersonDelete, props: true },

    { path: '/payment-types/', name: 'payment-types-index', component: PaymentTypeIndex, },
    { path: '/payment-types/details/:id', name: 'payment-types-details', component: PaymentTypeDetails, props: true },
    { path: '/payment-types/create', name: 'payment-types-create', component: PaymentTypeCreate, },
    { path: '/payment-types/edit/:id', name: 'payment-types-edit', component: PaymentTypeEdit, props: true },
    { path: '/payment-types/delete/:id', name: 'payment-types-delete', component: PaymentTypeDelete, props: true },

    { path: '/product-types/', name: 'product-types-index', component: ProductTypeIndex, },
    { path: '/product-types/details/:id', name: 'product-types-details', component: ProductTypeDetails, props: true },
    { path: '/product-types/create', name: 'product-types-create', component: ProductTypeCreate, },
    { path: '/product-types/edit/:id', name: 'product-types-edit', component: ProductTypeEdit, props: true },
    { path: '/product-types/delete/:id', name: 'product-types-delete', component: ProductTypeDelete, props: true },

]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router