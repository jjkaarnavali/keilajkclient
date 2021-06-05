import { HttpClient, IRouteViewModel } from "aurelia";
import { IQuiz } from "../../domain/IQuiz";
import { BaseService } from "../../services/base-service";
import { AppState } from "../../state/app-state";

export class QuizDelete implements IRouteViewModel {
    //https://localhost:5001/api/v1/Persons/id_of_entity 

    private service: BaseService<IQuiz> =
        new BaseService<IQuiz>("https://localhost:5001/api/v1/Quiz", this.httpClient, this.state.token);


    private data: IQuiz;

    constructor(protected httpClient: HttpClient, private state: AppState) {

    }

    async attached() {
        console.log("attached");
        console.log("state", this.state);
    }

    async load(parameters) {
        console.log("load", parameters);

        let response = await this.service.get(parameters[0]);
        if (response.data) {
            this.data = response.data;
        }

    }

    async deleteQuiz(event: Event): Promise<void> {
        
        let idToDelete = this.data.id;

        let response = await this.service.delete(idToDelete);

        console.log(response);
    }


}