import { HttpClient, IRouteViewModel } from "aurelia";
import { IQuiz } from "../../domain/IQuiz";
import { ICategory } from "../../domain/ICategory";
import { BaseService } from "../../services/base-service";
import { AppState } from "../../state/app-state";

export class QuizEdit implements IRouteViewModel {
    //https://localhost:5001/api/v1/Persons/id_of_entity 

    private service: BaseService<IQuiz> =
        new BaseService<IQuiz>("https://localhost:5001/api/v1/Quiz", this.httpClient, this.state.token);

    private categoryService: BaseService<ICategory> =
        new BaseService<ICategory>("https://localhost:5001/api/v1/Category", this.httpClient, this.state.token);

    private data: IQuiz;
    private categories: ICategory[] = [];

    constructor(protected httpClient: HttpClient, private state: AppState) {

    }

    async attached() {
        console.log("attached");
        console.log("state", this.state);
        let response = await this.categoryService.getAll();
        this.categories = response.data;
    }

    async load(parameters) {
        console.log("load", parameters);

        let response = await this.service.get(parameters[0]);
        if (response.data) {
            this.data = response.data;
        }

    }

    async saveChanges(event: Event): Promise<void> {
        let objToSave: IQuiz = { 
            id: this.data.id, 
            averageScore: this.data.averageScore,
            categoryId: this.data.categoryId,
            categoryName: this.data.categoryName,
            description: this.data.description,
            name: this.data.name,
            timesPlayed: this.data.timesPlayed
        };

        console.log(objToSave);
        let response = await this.service.put(objToSave);

        console.log(response);
    }


}
