import { cnpoliticalService } from '../services/cnpolitical-service';
import { ICNjoke } from '../domain/ICNjoke';

export class cnpoliticalsView {
    private data: ICNjoke[] =  [];

    constructor(private cnpoliticalService: cnpoliticalService){

    }
    
    async attached() {
        console.log("CNpoliticals attached");
        this.data.push(await this.cnpoliticalService.getAll());
        this.data.push(await this.cnpoliticalService.getAll());
        this.data.push(await this.cnpoliticalService.getAll());
        this.data.push(await this.cnpoliticalService.getAll());
        this.data.push(await this.cnpoliticalService.getAll());
        //this.data = await this.cnexplicitService.getAll();
        console.log(this.data);
        
    }
}
