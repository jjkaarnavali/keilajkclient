import { ITodo } from "../domain/ITodo";
import { ICNjoke } from "../domain/ICNjoke";

export class AppState {
    public todos: readonly ITodo[] = [];
    public cnexplicits: readonly ICNjoke[] = [];
    public cnpoliticals: readonly ICNjoke[] = [];
    public cnsports: readonly ICNjoke[] = [];

    constructor() {
        this.todos = [

            {
                description: 'World domination',
                done: false,
            },
            {
                description: 'Define more homeworks',
                done: false,
            },
        ];
    }

    addTodo(todo: ITodo): void {
        this.todos = [...this.todos, todo];
    }

    removeTodo(elemNo: number): void {
        this.todos = this.todos.filter((elem, index) => index !== elemNo);
    }

    countToDos(): number {
        return this.todos.length;
    }


    addCNexplicit(joke: ICNjoke): void {
        this.cnexplicits = [joke, ...this.cnexplicits];
    }

    addCNsport(joke: ICNjoke): void {
        this.cnsports = [joke, ...this.cnsports];
    }

    addCNpolitical(joke: ICNjoke): void {
        this.cnpoliticals = [joke, ...this.cnpoliticals];
    }

    
}
