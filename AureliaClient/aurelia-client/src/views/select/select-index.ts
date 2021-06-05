import { BaseService } from './../../services/base-service';
import { HttpClient, IRouteViewModel  } from "aurelia";
import { IQuiz } from '../../domain/IQuiz';
import { ICategory } from '../../domain/ICategory';
import { AppState } from '../../state/app-state';

export class SelectIndex implements IRouteViewModel {
    private quizService: BaseService<IQuiz> = 
        new BaseService<IQuiz>("https://localhost:5001/api/v1/Quiz", this.httpClient);

    private categoryService: BaseService<ICategory> = 
        new BaseService<ICategory>("https://localhost:5001/api/v1/Category", this.httpClient);
    
    private quizzes: IQuiz[] = [];
    private categories: ICategory[] = [];

    constructor(protected httpClient: HttpClient, private state: AppState){

    }

    async attached() {
        console.log("attached");

        let response = await this.quizService.getAll();
        if (response.data) {
            this.quizzes = response.data;
        }
        let responseCategory = await this.categoryService.getAll();
        if (responseCategory.data) {
            this.categories = responseCategory.data;
        }
        console.log(this.categories);
        console.log(this.quizzes);
    }

    async load(parameters) {
        console.log("load", parameters);

        let response = await this.quizService.getAll();
        if (response.data) {
            this.quizzes = response.data.filter(x => x.categoryId === parameters[0]);
        }
        

    }
}
