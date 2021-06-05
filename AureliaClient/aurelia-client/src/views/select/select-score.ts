import { BaseService } from './../../services/base-service';
import { HttpClient, IRouteViewModel  } from "aurelia";
import { IQuiz } from '../../domain/IQuiz';
import { ICategory } from '../../domain/ICategory';
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

    private categoryService: BaseService<ICategory> = 
        new BaseService<ICategory>("https://localhost:5001/api/v1/Category", this.httpClient);
    
    private quiz: IQuiz;
    private questions: IQuestion[] = [];
    private answers: IAnswer[] = [];
    private answersToQuestions: IAnswer[] = [];
    private chosenAnswers: IAnswer[] = [];

    constructor(protected httpClient: HttpClient, private state: AppState){

    }

    async attached() {
        /*console.log("attached");

        let questionResponse = await this.questionService.getAll();
        if (questionResponse.data) {
            this.questions = questionResponse.data.filter(x => x.quizId === this.quiz.id);
        }
        let answerResponse = await this.answerService.getAll();
        if (answerResponse.data) {
            this.answers = answerResponse.data;
        }
        this.questions.forEach(question => {
            this.answers.forEach(answer => {
                if(answer.questionId === question.id && !this.answersToQuestions.includes(answer)){
                    this.answersToQuestions.push(answer);
                }
            });
        });
        console.log("quiz", this.quiz);
        console.log("questions", this.questions);
        console.log("answers", this.answersToQuestions);
        console.log("chosen", this.chosenAnswers);*/
    }

    async load(parameters) {
        console.log("load", parameters);

    }

    async createGame(event: Event): Promise<void> 
    {
        console.log("chosen", this.chosenAnswers);
        console.log("event", event);
        
    }
}