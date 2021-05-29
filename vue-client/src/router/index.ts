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
import ProductIndex from '../views/products/Index.vue';
import ProductDetails from '../views/products/Details.vue';
import ProductCreate from '../views/products/Create.vue';
import ProductEdit from '../views/products/Edit.vue';
import ProductDelete from '../views/products/Delete.vue';
import PriceIndex from '../views/prices/Index.vue';
import PriceDetails from '../views/prices/Details.vue';
import PriceCreate from '../views/prices/Create.vue';
import PriceEdit from '../views/prices/Edit.vue';
import PriceDelete from '../views/prices/Delete.vue';
import OrderIndex from '../views/orders/Index.vue';
import OrderDetails from '../views/orders/Details.vue';
import OrderCreate from '../views/orders/Create.vue';
import OrderEdit from '../views/orders/Edit.vue';
import OrderDelete from '../views/orders/Delete.vue';
import ProductInOrderIndex from '../views/productsInOrders/Index.vue';
import ProductInOrderDetails from '../views/productsInOrders/Details.vue';
import ProductInOrderCreate from '../views/productsInOrders/Create.vue';
import ProductInOrderEdit from '../views/productsInOrders/Edit.vue';
import ProductInOrderDelete from '../views/productsInOrders/Delete.vue';
import ProductsPageIndex from '../views/productsPage/Index.vue';
import CartPageIndex from '../views/cartPage/Index.vue';
import PersonSelectPageIndex from '../views/selectPersonPage/Index.vue';
import PersonSelectPageCreate from '../views/selectPersonPage/Create.vue';
import PurchasePageIndex from '../views/purchasePage/Index.vue';
import ProductDetailsPageIndex from '../views/productDetailsPage/Index.vue';

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
    {
        path: '/productsPage/Index',
        name: 'productsPage-Index',
        component: ProductsPageIndex,
    },
    {
        path: '/productDetailsPage/Index/:id',
        name: 'productDetailsPage-Index',
        component: ProductDetailsPageIndex,
        props: true
    },
    {
        path: '/cartPage/Index',
        name: 'cartPage-Index',
        component: CartPageIndex
    },
    {
        path: '/selectPersonPage/Index',
        name: 'selectPersonPage-Index',
        component: PersonSelectPageIndex
    },
    {
        path: '/selectPersonPage/Create',
        name: 'selectPersonPage-Create',
        component: PersonSelectPageCreate
    },
    {
        path: '/purchasePage/Index/:id',
        name: 'purchasePage-Index',
        component: PurchasePageIndex,
        props: true
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

    { path: '/products/', name: 'products-index', component: ProductIndex, },
    { path: '/products/details/:id', name: 'products-details', component: ProductDetails, props: true },
    { path: '/products/create', name: 'products-create', component: ProductCreate, },
    { path: '/products/edit/:id', name: 'products-edit', component: ProductEdit, props: true },
    { path: '/products/delete/:id', name: 'products-delete', component: ProductDelete, props: true },

    { path: '/prices/', name: 'prices-index', component: PriceIndex, },
    { path: '/prices/details/:id', name: 'prices-details', component: PriceDetails, props: true },
    { path: '/prices/create', name: 'prices-create', component: PriceCreate, },
    { path: '/prices/edit/:id', name: 'prices-edit', component: PriceEdit, props: true },
    { path: '/prices/delete/:id', name: 'prices-delete', component: PriceDelete, props: true },

    { path: '/orders/', name: 'orders-index', component: OrderIndex, },
    { path: '/orders/details/:id', name: 'orders-details', component: OrderDetails, props: true },
    { path: '/orders/create', name: 'orders-create', component: OrderCreate, },
    { path: '/orders/edit/:id', name: 'orders-edit', component: OrderEdit, props: true },
    { path: '/orders/delete/:id', name: 'orders-delete', component: OrderDelete, props: true },

    { path: '/productsInOrders/', name: 'productsInOrders-index', component: ProductInOrderIndex, },
    { path: '/productsInOrders/details/:id', name: 'productsInOrders-details', component: ProductInOrderDetails, props: true },
    { path: '/productsInOrders/create', name: 'productsInOrders-create', component: ProductInOrderCreate, },
    { path: '/productsInOrders/edit/:id', name: 'productsInOrders-edit', component: ProductInOrderEdit, props: true },
    { path: '/productsInOrders/delete/:id', name: 'productsInOrders-delete', component: ProductInOrderDelete, props: true },

]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
