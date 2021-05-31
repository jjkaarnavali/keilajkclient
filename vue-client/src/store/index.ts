import { createStore } from 'vuex'
import axios from 'axios'
import { ILangResources } from '../domain/ILangResources';
import { IBaseLangResources } from '../domain/IBaseLangResources';
import { ISupportedLanguage } from './../domain/ISupportedLanguage';

export interface IState {
    token: string | null;
    firstname: string;
    lastname: string;
    supportedLanguages: ISupportedLanguage[];
    currentLanguage: ISupportedLanguage;
    langResources: ILangResources;
    baseLangResources: IBaseLangResources;
    appInitialized: boolean;
}

export const initialState: IState = {
    token: null,
    firstname: '',
    lastname: '',
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
    appInitialized: false,

}

export interface IJwtResponse {
    token: string;
    firstname: string;
    lastname: string;
}

export interface ILoginInfo {
    email: string;
    password: string;
}

export interface IRegisterInfo {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  userlevel: string;
}

export default createStore({
    state: initialState,
    mutations: {
        logOut: (state: IState) => {
            state.token = null;
            state.firstname = '';
            state.lastname = '';
        },
        logIn: (state: IState, jwtResponse: IJwtResponse) => {
            state.token = jwtResponse.token;
            state.firstname = jwtResponse.firstname;
            state.lastname = jwtResponse.lastname;
        },
    },
    actions: {
        async logIn(context, login: ILoginInfo): Promise<void> {
            const loginDataStr = JSON.stringify(login);
            console.log(loginDataStr);
            const response = await axios.post(
                'https://jakaar.azurewebsites.net/api/v1/Account/login',
                loginDataStr,
                { headers: { 'Content-type': 'application/json' } }
            );
            if (response.status === 200) {
                context.commit('logIn', response.data);
            }
        },
        async register(context, register: IRegisterInfo): Promise<void> {
            const registerDataStr = JSON.stringify(register);
            console.log(registerDataStr);
            const response = await axios.post(
                'https://jakaar.azurewebsites.net/api/v1/Account/register',
                registerDataStr,
                { headers: { 'Content-type': 'application/json' } }
            );
            if (response.status === 200) {
                context.commit('logIn', response.data);
            }
        }
    },
    getters: {
    },
    modules: {
    }
})
