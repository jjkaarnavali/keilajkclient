import { HttpClient, IRouteViewModel } from "aurelia";
import { IPerson } from "../../domain/IPerson";
import { IPersonEdit } from "../../domain/IPersonEdit";
import { BaseService } from "../../services/base-service";
import { AppState } from "../../state/app-state";

export class PersonCreate implements IRouteViewModel {
    //https://localhost:5001/api/v1/Persons/id_of_entity 

    private service: BaseService<IPersonEdit> =
        new BaseService<IPersonEdit>("https://jakaar.azurewebsites.net/api/v1/Persons", this.httpClient, this.state.token);


    private data: IPersonEdit;
    

    constructor(protected httpClient: HttpClient, private state: AppState) {

    }

    async attached() {
        console.log("attached");
        console.log("state", this.state);
    }

    

    async createPerson(event: Event): Promise<void> {
        let objToCreate: IPersonEdit = { 
            id: this.data.id, 
            firstName: 
            this.data.firstName, 
            lastName: 
            this.data.lastName,
            personsIdCode:
            this.data.personsIdCode
        };
        console.log(objToCreate);

        let response = await this.service.post(objToCreate);

        console.log(response);
    }


}