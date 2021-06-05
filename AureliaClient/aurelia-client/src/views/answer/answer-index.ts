import { BaseService } from './../../services/base-service';
import { HttpClient } from "aurelia";
import { IAnswer } from '../../domain/IAnswer';
import { AppState } from '../../state/app-state';

export class AnswerIndex {
    private service: BaseService<IAnswer> = 
        new BaseService<IAnswer>("https://localhost:5001/api/v1/Answer", this.httpClient);

    
    private data: IAnswer[] = [];

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