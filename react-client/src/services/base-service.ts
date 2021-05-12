import Axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { ApiBaseUrl } from '../configuration';
import { IFetchResponse } from '../types/IFetchResponse';
import { IMessages } from '../types/IMessages';


export interface IEntityId {
    id: string | undefined;
}
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

    static async put<TEntity extends IEntityId>(entity: TEntity, apiEndpoint: string, jwt?: string): Promise<IFetchResponse<TEntity>> {
        let url = apiEndpoint;
        url = url + '/' + entity.id;
        try {
            const response = await this.axios.put(url, entity, BaseService.getAxiosConfiguration(jwt));
            
            return {
                ok: response.status <= 299,
                statusCode: response.status,
                data: response.data as TEntity
            };
            
        } catch (err) {
            let error = err as AxiosError;
            return {
                ok: false,
                statusCode: error.response?.status ?? 500,
                messages: (error.response?.data as IMessages).messages,
            }
        }
    }

    static async delete<TEntity>(id: string,  apiEndpoint: string, jwt?: string): Promise<IFetchResponse<TEntity>> {
        let url = apiEndpoint;
        url = url + '/' + id;


        try {
            const response = await this.axios.delete(url, BaseService.getAxiosConfiguration(jwt));
            return {
                ok: response.status <= 299,
                statusCode: response.status,
                data: response.data as undefined
            };
        } catch (err) {
            let error = err as AxiosError;
            return {
                ok: false,
                statusCode: error.response?.status ?? 500,
                messages: (error.response?.data as IMessages).messages,
            }
        }
    }

}
