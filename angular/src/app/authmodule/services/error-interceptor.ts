import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpErrorResponse
} from "@angular/common/http";
import { AuthService } from "./auth.service";
import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";
import { Injectable } from "@angular/core";
import {ErrorComponent} from '../../common_module/body/error/error.component';

import {ErrorService} from '../../common_module/body/error/error.service';
import { MatDialog } from "@angular/material";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private dialog: MatDialog, private errorService: ErrorService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = "An unknown error occurred!";
        if (error.error.message) {
            errorMessage = error.error.message;
        }
       this.dialog.open(ErrorComponent, {data: {message: errorMessage}});
          return throwError(error);
      })
    );
  }
}
