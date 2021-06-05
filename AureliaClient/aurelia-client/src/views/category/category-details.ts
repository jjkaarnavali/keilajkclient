import { HttpClient, IRouteViewModel } from "aurelia";
import { ICategory } from "../../domain/ICategory";
import { BaseService } from "../../services/base-service";
import { AppState } from "../../state/app-state";

export class CategoryDetails implements IRouteViewModel  {
    //https://localhost:5001/api/v1/Persons/id_of_entity 

    private service: BaseService<ICategory> =
        new BaseService<ICategory>("https://localhost:5001/api/v1/Category", this.httpClient, this.state.token);


    private data: ICategory;

    constructor(protected httpClient: HttpClient, private state: AppState) {

    }

    async attached() {
        console.log("attached");
        console.log("state", this.state);
    }

    async load(parameters){
        console.log("load", parameters);

        let response = await this.service.get(parameters[0]);
        console.log(response);
        if (response.data) {
            this.data = response.data;
        }
        
    }
}
