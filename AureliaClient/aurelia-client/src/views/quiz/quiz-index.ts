import { BaseService } from './../../services/base-service';
import { HttpClient } from "aurelia";
import { IQuiz } from '../../domain/IQuiz';
import { AppState } from '../../state/app-state';

export class QuizIndex {
    private service: BaseService<IQuiz> = 
        new BaseService<IQuiz>("https://localhost:5001/api/v1/Quiz", this.httpClient);

    
    private data: IQuiz[] = [];

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