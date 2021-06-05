import { IRouter } from "aurelia";
import { AppState } from "./state/app-state";

export class MyApp {
  constructor(
    @IRouter private router: IRouter,
    private state: AppState) {

  }
  private isAdmin: boolean;

  attached() {
    console.log(this.state);
    console.log(this.isAdmin);
    if(this.state.token){
      var base64Url = this.state.token!.split('.')[1];
      var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      var decodedToken = JSON.parse(jsonPayload);
      console.log(decodedToken);
      var userRole = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
      console.log(userRole);
    }
  }


  async logOut(){
    this.state.token = null;
    this.state.firstname = null;
    this.state.lastname = null;
    this.state.isAdmin = false;

    await this.router.load('/home-index');
  }
}
