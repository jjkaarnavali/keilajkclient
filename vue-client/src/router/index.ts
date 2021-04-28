import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/identity/Login.vue';
import Register from '../views/identity/Register.vue';
import PersonIndex from '../views/persons/Index.vue';
import PersonDetails from '../views/persons/Details.vue';
import PersonCreate from '../views/persons/Create.vue';
import PersonEdit from '../views/persons/Edit.vue';
import PersonDelete from '../views/persons/Delete.vue';

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

]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
