import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from "@angular/router";
import { AuthService } from "../authmodule/services/auth.service";
import { ToastrService } from "ngx-toastr";

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService,private toastr: ToastrService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
   // let isAuth = this.authService.getIsAuth();
    const token = localStorage.getItem("token");
    if (token)  {
         return true;
    }

    this.toastr.warning("You have not logged in yet !!");

    this.router.navigate(["/"]);
   }
}
