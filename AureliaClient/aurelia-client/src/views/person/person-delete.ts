import { HttpClient, IRouteViewModel } from "aurelia";
import { IPerson } from "../../domain/IPerson";
import { IPersonEdit } from "../../domain/IPersonEdit";
import { BaseService } from "../../services/base-service";
import { AppState } from "../../state/app-state";

export class PersonDelete implements IRouteViewModel {
    //https://localhost:5001/api/v1/Persons/id_of_entity 

    private service: BaseService<IPerson> =
        new BaseService<IPerson>("https://localhost:5001/api/v1/Persons", this.httpClient, this.state.token);


    private data: IPerson;

    constructor(protected httpClient: HttpClient, private state: AppState) {

    }

    async attached() {
        console.log("attached");
        console.log("state", this.state);
    }

    async load(parameters) {
        console.log("load", parameters);

        let response = await this.service.get(parameters[0]);
        console.log("IPersonEdit", response);
        if (response.data) {
            this.data = response.data;
        }

    }

    async deletePerson(event: Event): Promise<void> {
        
        let idToDelete = this.data.id;

        let response = await this.service.delete(idToDelete);

        console.log(response);
    }


}