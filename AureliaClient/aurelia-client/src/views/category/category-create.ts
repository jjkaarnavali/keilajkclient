import { HttpClient, IRouteViewModel } from "aurelia";
import { ICategory } from "../../domain/ICategory";
import { BaseService } from "../../services/base-service";
import { AppState } from "../../state/app-state";

export class CategoryCreate implements IRouteViewModel {
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

    

    async createCategory(event: Event): Promise<void> {
        let objToCreate: ICategory = { 
            id: this.data.id, 
            categoryName: this.data.categoryName
        };
        console.log(objToCreate);

        let response = await this.service.post(objToCreate);

        console.log(response);
    }


}