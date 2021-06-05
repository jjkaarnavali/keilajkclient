import { HttpClient, IRouteViewModel } from "aurelia";
import { IAnswer } from "../../domain/IAnswer";
import { IQuestion } from "../../domain/IQuestion";
import { BaseService } from "../../services/base-service";
import { AppState } from "../../state/app-state";

export class AnswerCreate implements IRouteViewModel {
    //https://localhost:5001/api/v1/Persons/id_of_entity 

    private service: BaseService<IAnswer> =
        new BaseService<IAnswer>("https://localhost:5001/api/v1/Answer", this.httpClient, this.state.token);

    private questionService: BaseService<IQuestion> =
        new BaseService<IQuestion>("https://localhost:5001/api/v1/Question", this.httpClient, this.state.token);


    private data: IAnswer;
    private questions: IQuestion[] = [];
    

    constructor(protected httpClient: HttpClient, private state: AppState) {

    }

    async attached() {
        console.log("attached");
        console.log("state", this.state);
        let response = await this.questionService.getAll();
        this.questions = response.data;
    }

    

    async createAnswer(event: Event): Promise<void> {
        let objToCreate: IAnswer = { 
            id: this.data.id, 
            questionId: this.data.questionId,
            answerText: this.data.answerText,
            isCorrect: this.data.isCorrect
        };
        console.log(objToCreate);

        let response = await this.service.post(objToCreate);

        console.log(response);
    }


}