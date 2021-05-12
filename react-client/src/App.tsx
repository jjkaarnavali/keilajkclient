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
import HomeIndex from './containers/home/HomeIndex';
import Login from './containers/identity/Login';
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

                            <Route path="/producttypes/create" component={ProductTypeCreate1} />
                            <Route path="/producttypes/edit/:id" component={ProductTypeEdit} />
                            <Route path="/producttypes/delete/:id" component={ProductTypeDelete} />
                            <Route path="/producttypes/:id" component={ProductTypeDetails} />
                            <Route path="/producttypes" component={ProductTypeIndex} />

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

