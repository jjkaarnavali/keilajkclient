import { BaseService } from './../../services/base-service';
import { HttpClient } from "aurelia";
import { IQuestion } from '../../domain/IQuestion';
import { AppState } from '../../state/app-state';

export class QuestionIndex {
    private service: BaseService<IQuestion> = 
        new BaseService<IQuestion>("https://localhost:5001/api/v1/Question", this.httpClient);

    
    private data: IQuestion[] = [];

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