import { BaseService } from './../../services/base-service';
import { HttpClient } from "aurelia";
import { ICategory } from '../../domain/ICategory';
import { AppState } from '../../state/app-state';

export class CategoryIndex {
    private service: BaseService<ICategory> = 
        new BaseService<ICategory>("https://localhost:5001/api/v1/Category", this.httpClient);

    
    private data: ICategory[] = [];

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