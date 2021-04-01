import { ICNjoke } from '../domain/ICNjoke';
import { HttpClient, inject } from "aurelia";

@inject()
export class cnsportService {

    constructor(private httpClient: HttpClient) {

    }

    async getAll(): Promise<ICNjoke> {
        const response = await this.httpClient
            .get("https://api.chucknorris.io/jokes/random?category=sport", { cache: "no-store" });
        console.log(response);
        if (response.ok) {
            const data = (await response.json()) as ICNjoke;
            console.log(data);
            return data;
        }
        return ;
    }

    getAllPromiseStyle(): Promise<ICNjoke[]> {
        return this.httpClient
            .get("https://api.chucknorris.io/jokes/random?category=sport", { cache: "no-store" })
            .then(response => {
                console.log(response);
                return response.json();
            })
            .then(data => {
                console.log(data);
                return data;
            })
            .catch(error => []);
    }
}