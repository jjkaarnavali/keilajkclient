import { ITodo } from "../domain/ITodo";
import { ICNjoke } from "../domain/ICNjoke";

export class AppState {
    public todos: readonly ITodo[] = [];
    public cnexplicits: readonly ICNjoke[] = [];

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
        this.cnexplicits = [...this.cnexplicits, joke];
    }

    removeCNexplicit(elemNo: number): void {
        this.cnexplicits = this.cnexplicits.filter((elem, index) => index !== elemNo);
    }

    countToCNexplicit(): number {
        return this.cnexplicits.length;
    }
}
