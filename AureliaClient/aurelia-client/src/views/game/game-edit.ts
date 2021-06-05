import { HttpClient, IRouteViewModel } from "aurelia";
import { IGame } from "../../domain/IGame";
import { BaseService } from "../../services/base-service";
import { AppState } from "../../state/app-state";

export class GameEdit implements IRouteViewModel {
    //https://localhost:5001/api/v1/Persons/id_of_entity 

    private service: BaseService<IGame> =
        new BaseService<IGame>("https://localhost:5001/api/v1/Game", this.httpClient, this.state.token);

    private data: IGame;

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

    async saveChanges(event: Event): Promise<void> {
        let objToSave: IGame = { 
            id: this.data.id, 
            quizId: this.data.quizId,
            score: this.data.score
        };

        let response = await this.service.put(objToSave);

        console.log(response);
    }


}
