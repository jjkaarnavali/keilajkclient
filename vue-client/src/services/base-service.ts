import store from "@/store";
import { IFetchResponse } from "@/types/IFetchResponse";
import { IQueryParams } from "@/types/IQueryParams";
import axios from 'axios';

export interface IEntityId {
    id: string | undefined;
}

export class BaseService<TEntity extends IEntityId> {
    constructor(protected apiEndpointUrl: string, private jwt?: string) {
        console.log('BaseService.constructor');
        // apiEndpointUrl = https://xxx.xxx.xxx.xx/api/v1/ContactTypes
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

    async getAll(queryParams?: IQueryParams,): Promise<IFetchResponse<TEntity[]>> {
        let url = this.apiEndpointUrl;
        console.log("get all current language");
        console.log(store.state.currentLanguage);

        /* if (this.langName !== undefined && this.langName !== null) {
            url = url + '?culture=' + this.langName;
        } */

        if (store.state.currentLanguage !== undefined) {
            url = url + '?culture=' + store.state.currentLanguage.name;
        }

        console.log("url");
        console.log(url);

        if (queryParams !== undefined) {
            // TODO: add query params to url
            url = url + "";
        }

        try {
            const response = await axios.get(url, { headers: this.authHeaders });
            if (response.status >= 200 && response.status < 300) {
                return {
                    statusCode: response.status,
                    data: response.data as TEntity[],
                };
            }
            return {
                statusCode: response.status,
                errorMessage: response.statusText,
            };
        } catch (reason) {
            return {
                statusCode: 0,
                errorMessage: JSON.stringify(reason),
            };
        }
    }

    async get(id: string, queryParams?: IQueryParams,): Promise<IFetchResponse<TEntity>> {
        let url = this.apiEndpointUrl;
        url = url + '/' + id;

        if (queryParams !== undefined) {
            // TODO: add query params to url
        }

        try {
            const response = await axios.get(url, { headers: this.authHeaders });
            if (response.status >= 200 && response.status < 300) {
                return {
                    statusCode: response.status,
                    data: response.data as TEntity,
                };
            }

            return {
                statusCode: response.status,
                errorMessage: response.statusText,
            };
        } catch (reason) {
            return {
                statusCode: 0,
                errorMessage: JSON.stringify(reason),
            };
        }
    }

    async post(entity: TEntity, queryParams?: IQueryParams,): Promise<IFetchResponse<TEntity>> {
        const url = this.apiEndpointUrl;

        if (queryParams !== undefined) {
            // TODO: add query params to url
        }

        try {
            const response = await axios.post(url, entity, { headers: this.authHeaders });
            if (response.status >= 200 && response.status < 300) {
                return {
                    statusCode: response.status,
                    data: undefined,
                };
            }

            return {
                statusCode: response.status,
                errorMessage: response.statusText,
            };
        } catch (reason) {
            return {
                statusCode: 0,
                errorMessage: JSON.stringify(reason),
            };
        }
    }

    async put(entity: TEntity, queryParams?: IQueryParams,): Promise<IFetchResponse<TEntity>> {
        let url = this.apiEndpointUrl;
        url = url + '/' + entity.id;

        if (queryParams !== undefined) {
            // TODO: add query params to url
        }

        try {
            const response = await axios.put(url, entity, { headers: this.authHeaders });
            if (response.status >= 200 && response.status < 300) {
                return {
                    statusCode: response.status,
                    data: undefined,
                };
            }

            return {
                statusCode: response.status,
                errorMessage: response.statusText,
            };
        } catch (reason) {
            return {
                statusCode: 0,
                errorMessage: JSON.stringify(reason),
            };
        }
    }

    async delete(entity: TEntity, queryParams?: IQueryParams,): Promise<IFetchResponse<TEntity>> {
        let url = this.apiEndpointUrl;
        url = url + '/' + entity.id;

        if (queryParams !== undefined) {
            // TODO: add query params to url
        }

        try {
            const response = await axios.delete(url, { headers: this.authHeaders });
            if (response.status >= 200 && response.status < 300) {
                return {
                    statusCode: response.status,
                    data: undefined,
                };
            }

            return {
                statusCode: response.status,
                errorMessage: response.statusText,
            };
        } catch (reason) {
            return {
                statusCode: 0,
                errorMessage: JSON.stringify(reason),
            };
        }
    }
}
