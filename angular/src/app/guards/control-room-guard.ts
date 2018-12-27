import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthService } from "../authmodule/services/auth.service";
import { ToastrService } from "ngx-toastr";

@Injectable({
  providedIn: "root"
})
export class ControlRoomGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService,
    private toastr: ToastrService) {}
  canActivate() {

    const token = this.authService.getTokenData();
    if (token.userType == "S") {
      return true;
    }
    this.toastr.warning("Security Risk - You are not the authorized person ");
    this.router.navigate(["/dashboard"]);
    return false;
  }
}
