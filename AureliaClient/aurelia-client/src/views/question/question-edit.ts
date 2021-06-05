import { HttpClient, IRouteViewModel } from "aurelia";
import { IQuiz } from "../../domain/IQuiz";
import { IQuestion } from "../../domain/IQuestion";
import { BaseService } from "../../services/base-service";
import { AppState } from "../../state/app-state";

export class QuestionEdit implements IRouteViewModel {
    //https://localhost:5001/api/v1/Persons/id_of_entity 

    private service: BaseService<IQuestion> =
        new BaseService<IQuestion>("https://localhost:5001/api/v1/Question", this.httpClient, this.state.token);

    private quizService: BaseService<IQuiz> =
        new BaseService<IQuiz>("https://localhost:5001/api/v1/Quiz", this.httpClient, this.state.token);

    private data: IQuestion;
    private quizzes: IQuiz[] = [];

    constructor(protected httpClient: HttpClient, private state: AppState) {

    }

    async attached() {
        console.log("attached");
        console.log("state", this.state);
        let response = await this.quizService.getAll();
        this.quizzes = response.data;
    }

    async load(parameters) {
        console.log("load", parameters);

        let response = await this.service.get(parameters[0]);
        if (response.data) {
            this.data = response.data;
        }

    }

    async saveChanges(event: Event): Promise<void> {
        let objToSave: IQuestion = { 
            id: this.data.id, 
            quizId: this.data.quizId,
            questionText: this.data.questionText
        };

        let response = await this.service.put(objToSave);

        console.log(response);
    }


}
