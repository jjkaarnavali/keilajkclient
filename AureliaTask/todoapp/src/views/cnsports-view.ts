import { cnsportService } from '../services/cnsport-service';
import { ICNjoke } from '../domain/ICNjoke';
import { AppState } from "../state/app-state";

export class cnsportsView {
    private data: ICNjoke[] =  [];

    constructor(private cnsportService: cnsportService, private appState: AppState){

    }
    
    async attached() {
        console.log("CNsports attached");
        /*this.data.push(await this.cnsportService.getAll());
        this.data.push(await this.cnsportService.getAll());
        this.data.push(await this.cnsportService.getAll());
        this.data.push(await this.cnsportService.getAll());
        this.data.push(await this.cnsportService.getAll());*/
        //this.data = await this.cnexplicitService.getAll();

        this.appState.addCNsport(await this.cnsportService.getAll());
        this.appState.addCNsport(await this.cnsportService.getAll());
        this.appState.addCNsport(await this.cnsportService.getAll());
        this.appState.addCNsport(await this.cnsportService.getAll());
        this.appState.addCNsport(await this.cnsportService.getAll());

        console.log(this.data);
        
    }
}
