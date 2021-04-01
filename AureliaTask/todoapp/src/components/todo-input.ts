import { bindable, EventAggregator, IDisposable } from "aurelia";

export class TodoInput {

    @bindable public placeholder: string = "Default";
    public description: string = '';

    private subscriptions: IDisposable[] = [];

    constructor(private eventAggregator: EventAggregator) {

    }


    detached() {
        this.subscriptions.forEach(subscription => subscription.dispose());
        this.subscriptions = [];
    }


    addNewTodo() {
        console.log('Add new todo: ' + this.description);

        this.eventAggregator.publish('new-todo', this.description);
        
        setTimeout(() => {
            this.description = '';
        }, 100);
    }

    /*

    // this is not nice.....
    @bindable public addnewCallback: (decr: string) => void = null;


    addNewTodo() {
        console.log('Add new todo: ' + this.description);

        this.addnewCallback(this.description);

        setTimeout(() => {
            this.description = '';
        }, 100);
    }
    */
}
