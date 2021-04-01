import { cnexplicitService } from '../services/cnexplicit-service';
import { ICNjoke } from '../domain/ICNjoke';
import { AppState } from "../state/app-state";

export class cnexplicitsView {
    private data: ICNjoke[] =  [];

    constructor(private cnexplicitService: cnexplicitService, private appState: AppState){

    }
    
    async attached() {
        console.log("CNexplicits attached");
        /*this.data.push(await this.cnexplicitService.getAll());
        this.data.push(await this.cnexplicitService.getAll());
        this.data.push(await this.cnexplicitService.getAll());
        this.data.push(await this.cnexplicitService.getAll());
        this.data.push(await this.cnexplicitService.getAll());
        //this.data = await this.cnexplicitService.getAll();
        console.log(this.data);*/
        this.appState.addCNexplicit(await this.cnexplicitService.getAll());
        this.appState.addCNexplicit(await this.cnexplicitService.getAll());
        this.appState.addCNexplicit(await this.cnexplicitService.getAll());
        this.appState.addCNexplicit(await this.cnexplicitService.getAll());
        this.appState.addCNexplicit(await this.cnexplicitService.getAll());
    }
    


}
