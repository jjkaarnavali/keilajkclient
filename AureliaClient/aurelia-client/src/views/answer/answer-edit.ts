import { HttpClient, IRouteViewModel } from "aurelia";
import { IAnswer } from "../../domain/IAnswer";
import { IQuestion } from "../../domain/IQuestion";
import { BaseService } from "../../services/base-service";
import { AppState } from "../../state/app-state";

export class AnswerEdit implements IRouteViewModel {
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

    async load(parameters) {
        console.log("load", parameters);

        let response = await this.service.get(parameters[0]);
        console.log("IPersonEdit", response);
        if (response.data) {
            this.data = response.data;
        }

    }

    async saveChanges(event: Event): Promise<void> {
        let objToSave: IAnswer = { 
            id: this.data.id, 
            questionId: this.data.questionId,
            answerText: this.data.answerText,
            isCorrect: this.data.isCorrect
        };

        let response = await this.service.put(objToSave);

        console.log(response);
    }


}
