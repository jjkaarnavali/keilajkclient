import { BaseService } from './../../services/base-service';
import { HttpClient } from "aurelia";
import { IGame } from '../../domain/IGame';
import { AppState } from '../../state/app-state';

export class GameIndex {
    private service: BaseService<IGame> = 
        new BaseService<IGame>("https://localhost:5001/api/v1/Game", this.httpClient);

    
    private data: IGame[] = [];

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