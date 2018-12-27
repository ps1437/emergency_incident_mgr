import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../../authmodule/services/auth.service";

@Component({
  selector: "app-search",
  templateUrl: "./app-search.component.html",
  styleUrls: ["./app-search.component.css"]
})
export class AppSearchComponent implements OnInit {
  constructor(private authService: AuthService) {}
private userName:string;

  className :string ='redTheme';
  ngOnInit() {}

  logOut() {
    const tokenData = this.authService.getTokenData();

    this.userName = tokenData.userName;

    this.authService.logout();
  }
}
