import { cnpoliticalService } from '../services/cnpolitical-service';
import { ICNjoke } from '../domain/ICNjoke';
import { AppState } from "../state/app-state";

export class cnpoliticalsView {
    private data: ICNjoke[] =  [];

    constructor(private cnpoliticalService: cnpoliticalService, private appState: AppState){

    }
    
    async attached() {
        /*console.log("CNpoliticals attached");
        this.data.push(await this.cnpoliticalService.getAll());
        this.data.push(await this.cnpoliticalService.getAll());
        this.data.push(await this.cnpoliticalService.getAll());
        this.data.push(await this.cnpoliticalService.getAll());
        this.data.push(await this.cnpoliticalService.getAll());*/
        //this.data = await this.cnexplicitService.getAll();

        this.appState.addCNpolitical(await this.cnpoliticalService.getAll());
        this.appState.addCNpolitical(await this.cnpoliticalService.getAll());
        this.appState.addCNpolitical(await this.cnpoliticalService.getAll());
        this.appState.addCNpolitical(await this.cnpoliticalService.getAll());
        this.appState.addCNpolitical(await this.cnpoliticalService.getAll());
        console.log(this.data);
        
    }
}
