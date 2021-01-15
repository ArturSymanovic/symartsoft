import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router, private snackbar: MatSnackBar) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error) => {
        if (error) {
          switch (error.status) {
            case 400:
              this.snackbar.open(error.statusText, '', {
                duration: 2000,
                horizontalPosition: 'right',
                verticalPosition: 'bottom',
              });
              if (error.error.errors) {
                const modelStateErrors = [];
                for (const key in error.error.errors) {
                  if (error.error.errors[key]) {
                    modelStateErrors.push(error.error.errors[key]);
                  }
                }
                throw modelStateErrors.flat();
              } else if (Array.isArray(error.error)) {
                const modelStateErrors = [];
                for (const err of error.error) {
                  modelStateErrors.push(err.description);
                }
                throw modelStateErrors;
              }
              break;

            case 401:
              this.snackbar.open(error.statusText, '', {
                duration: 2000,
                horizontalPosition: 'right',
                verticalPosition: 'bottom',
              });
              break;

            case 404:
              this.router.navigateByUrl('/not-found');
              break;

            case 500:
              const navigationExtras: NavigationExtras = {
                state: { error: error.error },
              };
              this.router.navigateByUrl('/server-error', navigationExtras);
              break;

            default:
              this.snackbar.open('Unexpected error occured', '', {
                duration: 2000,
                horizontalPosition: 'right',
                verticalPosition: 'bottom',
              });
              //console.log(error);
              break;
          }
        }
        return throwError(error);
      })
    );
  }
}
