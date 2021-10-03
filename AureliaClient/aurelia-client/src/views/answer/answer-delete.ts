import { HttpClient, IRouteViewModel } from "aurelia";
import { IAnswer } from "../../domain/IAnswer";
import { BaseService } from "../../services/base-service";
import { AppState } from "../../state/app-state";

export class AnswerDelete implements IRouteViewModel {
    //https://localhost:5001/api/v1/Persons/id_of_entity 

    private service: BaseService<IAnswer> =
        new BaseService<IAnswer>("https://localhost:5001/api/v1/Answer", this.httpClient, this.state.token);


    private data: IAnswer;

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

    async deleteAnswer(event: Event): Promise<void> {
        
        let idToDelete = this.data.id;

        let response = await this.service.delete(idToDelete);

        console.log(response);
    }


}