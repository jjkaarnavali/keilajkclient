import { ISupportedLanguage } from './../domain/ISupportedLanguage';
import { IMessage } from '../types/IMessage';
import { ILangResources } from '../domain/ILangResources';
import store from "@/store";
import { IFetchResponse } from "@/types/IFetchResponse";
import { IQueryParams } from "@/types/IQueryParams";
import axios from 'axios';

export class LangService {
    constructor(protected apiEndpointUrl: string, private jwt?: string) {
        console.log('LangService.constructor');
    }

    private authHeaders = this.jwt !== undefined
        ? {
            'Cache-Control': 'no-cache',
            Pragma: 'no-cache',
            Expires: '0',
            Authorization: 'Bearer ' + this.jwt
        } : {
            'Cache-Control': 'no-cache',
            Pragma: 'no-cache',
            Expires: '0',
        };

    async getSupportedLanguages(endpoint: string = "", langName: string = ""): Promise<IFetchResponse<ISupportedLanguage[] | IMessage>> {
        let url = this.apiEndpointUrl + endpoint;

        if (langName !== "") {
            url = url + '?culture=' + langName;
        }
        try {
            const response = await axios.get(url, { headers: this.authHeaders });
            const data = await response.data;

            if (response.status >= 200 && response.status < 300) {
                return {
                    statusCode: response.status,
                    data: data,
                };
            }

            return {
                statusCode: response.status,
                errorMessage: data.messages.join(' '),
            };
        } catch (reason) {
            console.log('in catch');
            return {
                statusCode: 0,
                errorMessage: JSON.stringify(reason),
            };
        }
    }

    async getLangResources(endpoint: string = "", langName: string = ""): Promise<IFetchResponse<ILangResources | IMessage>> {
        let url = this.apiEndpointUrl + endpoint;

        if (langName !== "") {
            url = url + '?culture=' + langName;
        }
        try {
            const response = await axios.get(url, { headers: this.authHeaders });
            const data = await response.data;

            if (response.status >= 200 && response.status < 300) {
                return {
                    statusCode: response.status,
                    data: data,
                };
            }

            return {
                statusCode: response.status,
                errorMessage: data.messages.join(' '),
            };
        } catch (reason) {
            console.log('in catch');
            return {
                statusCode: 0,
                errorMessage: JSON.stringify(reason),
            };
        }
    }
}
