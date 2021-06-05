import { HttpClient, IRouter } from "aurelia";
import { AccountService } from "../../services/account-service";
import { AppState } from "../../state/app-state";
import { IJwt } from "../../types/IJwt";

export class IdentityRegister {
  //AccountService

    private service: AccountService =
        new AccountService("https://localhost:5001/api/v1/Account/register", this.httpClient);

    private email: string;
    private password: string;
    private firstname: string;
    private lastname: string;


    constructor(
        @IRouter private router: IRouter,
        private state: AppState,
        protected httpClient: HttpClient) {

    }

    async registerClicked(event: Event) {
        event.preventDefault();
        event.stopPropagation();

        

        let response = await this.service.register(this.email, this.password, this.firstname, this.lastname);
        console.log(response);

        if (response.statusCode == 200 && response.data ) {
            this.state.token = (response.data as IJwt).token;
            this.state.firstname = (response.data as IJwt).firstname;
            this.state.lastname = (response.data as IJwt).lastname;
            var base64Url = this.state.token!.split('.')[1];
            var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));

            var decodedToken = JSON.parse(jsonPayload);
            console.log(decodedToken);
            var userRole = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
            if(userRole === "Admin"){
                this.state.isAdmin = true;
            }

            await this.router.load('/home-index');
        }
        

    }

}
