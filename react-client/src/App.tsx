import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import ProductTypeCreate from './containers/product-types/ProductTypeCreate';
import ProductTypeCreate1 from './containers/product-types/ProductTypeCreate1';
import ProductTypeDelete from './containers/product-types/ProductTypeDelete';
import ProductTypeDetails from './containers/product-types/ProductTypeDetails';
import ProductTypeEdit from './containers/product-types/ProductTypeEdit';
import ProductTypeIndex from './containers/product-types/ProductTypeIndex';

import PaymentTypeCreate from './containers/payment-types/PaymentTypeCreate';
import PaymentTypeDelete from './containers/payment-types/PaymentTypeDelete';
import PaymentTypeDetails from './containers/payment-types/PaymentTypeDetails';
import PaymentTypeEdit from './containers/payment-types/PaymentTypeEdit';
import PaymentTypeIndex from './containers/payment-types/PaymentTypeIndex';

import PersonCreate from './containers/persons/PersonCreate';
import PersonDelete from './containers/persons/PersonDelete';
import PersonDetails from './containers/persons/PersonDetails';
import PersonEdit from './containers/persons/PersonEdit';
import PersonIndex from './containers/persons/PersonIndex';

import HomeIndex from './containers/home/HomeIndex';
import Login from './containers/identity/Login';
import Register from './containers/identity/Register';
import Page404 from './containers/Page404';
import PageForm from './containers/PageForm';
import { AppContextProvider, initialAppState } from './context/AppContext';

function App() {
    const setAuthInfo = (jwt: string | null, firstName: string, lastName: string): void => {
        setAppState({...appState, jwt, firstName, lastName});
    }

    const [appState, setAppState] = useState({...initialAppState, setAuthInfo });

    return (
        <>
            <AppContextProvider value={appState} >
                <Header />
                <div className="container">
                    <main role="main" className="pb-3">
                        <Switch>
                            <Route exact path="/" component={HomeIndex} />

                            <Route path="/form" component={PageForm} />

                            <Route path="/identity/login" component={Login} />
                            <Route path="/identity/register" component={Register} />

                            <Route path="/producttypes/create" component={ProductTypeCreate1} />
                            <Route path="/producttypes/edit/:id" component={ProductTypeEdit} />
                            <Route path="/producttypes/delete/:id" component={ProductTypeDelete} />
                            <Route path="/producttypes/:id" component={ProductTypeDetails} />
                            <Route path="/producttypes" component={ProductTypeIndex} />

                            <Route path="/paymenttypes/create" component={PaymentTypeCreate} />
                            <Route path="/paymenttypes/edit/:id" component={PaymentTypeEdit} />
                            <Route path="/paymenttypes/delete/:id" component={PaymentTypeDelete} />
                            <Route path="/paymenttypes/:id" component={PaymentTypeDetails} />
                            <Route path="/paymenttypes" component={PaymentTypeIndex} />

                            <Route path="/persons/create" component={PersonCreate} />
                            <Route path="/persons/edit/:id" component={PersonEdit} />
                            <Route path="/persons/delete/:id" component={PersonDelete} />
                            <Route path="/persons/:id" component={PersonDetails} />
                            <Route path="/persons" component={PersonIndex} />

                            <Route component={Page404} />
                        </Switch>
                    </main>
                </div>
                <Footer />
            </AppContextProvider>
        </>
    );
}

export default App;

