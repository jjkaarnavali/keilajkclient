import { HttpClient, IRouteViewModel } from "aurelia";
import { IQuiz } from "../../domain/IQuiz";
import { ICategory } from "../../domain/ICategory";
import { BaseService } from "../../services/base-service";
import { AppState } from "../../state/app-state";

export class QuizCreate implements IRouteViewModel {
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

    

    async createQuiz(event: Event): Promise<void> {
        let objToCreate: IQuiz = { 
            id: this.data.id, 
            categoryId: this.data.categoryId,
            categoryName: this.data.categoryName,
            name: this.data.name,
            description: this.data.description,
            averageScore: this.data.averageScore,
            timesPlayed: this.data.timesPlayed
        };
        console.log(objToCreate);

        let response = await this.service.post(objToCreate);

        console.log(response);
    }


}