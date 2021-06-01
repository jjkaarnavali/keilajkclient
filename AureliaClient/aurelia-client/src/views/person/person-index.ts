
import { BaseService } from './../../services/base-service';
import { HttpClient } from "aurelia";
import { IPerson } from '../../domain/IPerson';
import { AppState } from '../../state/app-state';

export class PersonIndex {
    private service: BaseService<IPerson> = 
        new BaseService<IPerson>("https://jakaar.azurewebsites.net/api/v1/Persons", this.httpClient);

    
    private data: IPerson[] = [];

    constructor(protected httpClient: HttpClient, private state: AppState){

    }

    async attached() {
        console.log("attached");

        let response = await this.service.getAll();
        if (response.data) {
            this.data = response.data;
        }
    }
}
