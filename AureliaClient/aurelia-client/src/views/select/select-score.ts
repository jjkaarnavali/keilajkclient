import { BaseService } from './../../services/base-service';
import { HttpClient, IRouteViewModel  } from "aurelia";
import { IQuiz } from '../../domain/IQuiz';
import { IGame } from '../../domain/IGame';
import { IAnswer } from '../../domain/IAnswer';
import { IQuestion } from '../../domain/IQuestion';
import { AppState } from '../../state/app-state';

export class SelectScore implements IRouteViewModel {
    private quizService: BaseService<IQuiz> = 
        new BaseService<IQuiz>("https://localhost:5001/api/v1/Quiz", this.httpClient);

    private answerService: BaseService<IAnswer> = 
        new BaseService<IAnswer>("https://localhost:5001/api/v1/Answer", this.httpClient);

    private questionService: BaseService<IQuestion> = 
        new BaseService<IQuestion>("https://localhost:5001/api/v1/Question", this.httpClient);

    private gameService: BaseService<IGame> = 
        new BaseService<IGame>("https://localhost:5001/api/v1/Game", this.httpClient);
    
    private quiz: IQuiz;
    private game: IGame;
    private questions: IQuestion[] = [];
    private answers: IAnswer[] = [];
    private answersToQuestions: IAnswer[] = [];
    private chosenAnswers: IAnswer[] = [];

    constructor(protected httpClient: HttpClient, private state: AppState){

    }

    async attached() {
       
    }

    async load(parameters) {
        console.log("load", parameters);
        let quizResponse = await this.quizService.get(parameters[0]);
        if (quizResponse.data) {
            this.quiz = quizResponse.data;
        }
        let gameResponse = await this.gameService.get(parameters[1]);
        if (gameResponse.data) {
            this.game = gameResponse.data;
        }

    }

}