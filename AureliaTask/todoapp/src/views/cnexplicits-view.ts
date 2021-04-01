import { cnexplicitService } from '../services/cnexplicit-service';
import { ICNjoke } from '../domain/ICNjoke';

export class cnexplicitsView {
    private data: ICNjoke[] =  [];

    constructor(private cnexplicitService: cnexplicitService){

    }
    
    async attached() {
        console.log("CNexplicits attached");
        this.data.push(await this.cnexplicitService.getAll());
        this.data.push(await this.cnexplicitService.getAll());
        this.data.push(await this.cnexplicitService.getAll());
        this.data.push(await this.cnexplicitService.getAll());
        this.data.push(await this.cnexplicitService.getAll());
        //this.data = await this.cnexplicitService.getAll();
        console.log(this.data);
        
    }
}
