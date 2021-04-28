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

]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
