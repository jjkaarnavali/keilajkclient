import { cnsportService } from '../services/cnsport-service';
import { ICNjoke } from '../domain/ICNjoke';

export class cnsportsView {
    private data: ICNjoke[] =  [];

    constructor(private cnsportService: cnsportService){

    }
    
    async attached() {
        console.log("CNsports attached");
        this.data.push(await this.cnsportService.getAll());
        this.data.push(await this.cnsportService.getAll());
        this.data.push(await this.cnsportService.getAll());
        this.data.push(await this.cnsportService.getAll());
        this.data.push(await this.cnsportService.getAll());
        //this.data = await this.cnexplicitService.getAll();
        console.log(this.data);
        
    }
}
