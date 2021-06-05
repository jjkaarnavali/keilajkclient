import { BaseService } from './../../services/base-service';
import { HttpClient, IRouteViewModel  } from "aurelia";
import { IQuiz } from '../../domain/IQuiz';
import { IGame } from '../../domain/IGame';
import { IAnswer } from '../../domain/IAnswer';
import { IQuestion } from '../../domain/IQuestion';
import { AppState } from '../../state/app-state';

export class SelectPlay implements IRouteViewModel {
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
        console.log("attached");

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
        console.log("chosen", this.chosenAnswers);
    }

    async load(parameters) {
        console.log("load", parameters);

        let response = await this.quizService.get(parameters[0]);
        if (response.data) {
            this.quiz = response.data;
        }
    }

    async createGame(event: Event): Promise<void> 
    {
        event.preventDefault();
        console.log("chosen", this.chosenAnswers);
        console.log("event", event);
        let correctAnswers = 0;
        let totalAnswers = 0;
        this.chosenAnswers.forEach(answer => {
            if(answer.isCorrect) {
                correctAnswers++;
            }
            totalAnswers++;
        });

        let score = (correctAnswers / totalAnswers) * 100;
        
        this.quiz.averageScore = (this.quiz.averageScore * this.quiz.timesPlayed + score) / (this.quiz.timesPlayed + 1);
        this.quiz.timesPlayed++;
        /*this.game.quizId = this.quiz.id;
        this.game.score = score;*/
        let quizToEdit: IQuiz = {
            id: this.quiz.id,
            categoryId: this.quiz.categoryId,
            categoryName: this.quiz.categoryName,
            name: this.quiz.name,
            description: this.quiz.description,
            averageScore: this.quiz.averageScore,
            timesPlayed: this.quiz.timesPlayed
        };
        let gameToCreate: IGame = { 
            id: undefined, 
            quizId: this.quiz.id,
            score: score
        };
        console.log(quizToEdit);
        console.log(gameToCreate);
        
        let response = await this.quizService.put(quizToEdit);
        
        let gameResponse = await this.gameService.post(gameToCreate);

    }
}
