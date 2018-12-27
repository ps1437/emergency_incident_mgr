import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthService } from "../authmodule/services/auth.service";
import { ToastrService } from "ngx-toastr";

@Injectable({
  providedIn: "root"
})
export class AdminAuthGuard implements CanActivate {

  constructor(private router: Router, private toastr: ToastrService,
     private authService: AuthService) {}
  canActivate() {

    const token = this.authService.getTokenData();
    if (token.userType == "A") return true;

    this.toastr.warning("Security Risk - You are not the authorized person ");
    this.router.navigate(["/dashboard"]);
    return false;
  }
}
