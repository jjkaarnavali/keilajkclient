import Axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { ApiBaseUrl } from '../configuration';
import { IFetchResponse } from '../types/IFetchResponse';
import { IMessages } from '../types/IMessages';

export abstract class BaseService {
    protected static axios = Axios.create({
        baseURL: ApiBaseUrl,
        headers: {
            'Content-Type': 'application/json'
        }
    });

    protected static getAxiosConfiguration(jwt?: string): AxiosRequestConfig | undefined {
        if (!jwt) return undefined;
        const config: AxiosRequestConfig = {
            headers: {
                Authorization: 'Bearer ' + jwt
            }
        };  
        return config;      
    }

    static async getAll<TEntity>(apiEndpoint: string, jwt?: string): Promise<IFetchResponse<TEntity[]>> {
        try {

            let response = await this.axios.get<TEntity[]>(apiEndpoint, BaseService.getAxiosConfiguration(jwt));
            return {
                ok: response.status <= 299,
                statusCode: response.status,
                data: response.data
            };    
        }
        catch (err) {
            let error = err as AxiosError;
            return {
                ok: false,
                statusCode: error.response?.status ?? 500,
                messages: (error.response?.data as IMessages).messages,
            }
        }

    }

    static async get<TEntity>(id: string, apiEndpoint: string, jwt?: string): Promise<IFetchResponse<TEntity>> {
        try {

            apiEndpoint = apiEndpoint + '/' + id;
            let response = await this.axios.get<TEntity>(apiEndpoint, BaseService.getAxiosConfiguration(jwt));
            return {
                ok: response.status <= 299,
                statusCode: response.status,
                data: response.data as TEntity
            };    
        }
        catch (err) {
            let error = err as AxiosError;
            return {
                ok: false,
                statusCode: error.response?.status ?? 500,
                messages: (error.response?.data as IMessages).messages,
            }
        }

    }

    static async post<TEntity>(entity: TEntity, apiEndpoint: string, jwt?: string): Promise<IFetchResponse<TEntity>> {
        try {

            console.log(entity);
            console.log(jwt);
            console.log("joudis servicesse");
            let response = await this.axios.post<TEntity>(apiEndpoint, entity, BaseService.getAxiosConfiguration(jwt));
            return {
                ok: response.status <= 299,
                statusCode: response.status,
                data: response.data as TEntity
            };    
        }
        catch (err) {
            let error = err as AxiosError;
            return {
                ok: false,
                statusCode: error.response?.status ?? 500,
                messages: (error.response?.data as IMessages).messages,
            }
        }

    }

}
