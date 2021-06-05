import { HttpClient, IRouteViewModel } from "aurelia";
import { IGame } from "../../domain/IGame";
import { BaseService } from "../../services/base-service";
import { AppState } from "../../state/app-state";

export class GameCreate implements IRouteViewModel {
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

    

    async createGame(event: Event): Promise<void> {
        let objToCreate: IGame = { 
            id: this.data.id, 
            quizId: this.data.quizId,
            score: this.data.score
        };
        console.log(objToCreate);

        let response = await this.service.post(objToCreate);

        console.log(response);
    }


}