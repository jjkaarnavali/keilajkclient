import { HttpClient, IRouter } from "aurelia";
import { AccountService } from "../../services/account-service";
import { AppState } from "../../state/app-state";
import { IJwt } from "../../types/IJwt";

export class IdentityRegister {
  //AccountService

    private service: AccountService =
        new AccountService("https://jakaar.azurewebsites.net/api/v1/Account/register", this.httpClient);

    private email: string;
    private password: string;
    private firstname: string;
    private lastname: string;
    private userlevel: string;


    constructor(
        @IRouter private router: IRouter,
        private state: AppState,
        protected httpClient: HttpClient) {

    }

    async registerClicked(event: Event) {
        event.preventDefault();
        event.stopPropagation();

        

        let response = await this.service.register(this.email, this.password, this.firstname, this.lastname, this.userlevel);
        console.log(response);

        if (response.statusCode == 200 && response.data ) {
            this.state.token = (response.data as IJwt).token;
            this.state.firstname = (response.data as IJwt).firstname;
            this.state.lastname = (response.data as IJwt).lastname;

            await this.router.load('/home-index');
        }
        

    }

}
