import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../_services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private snackbar: MatSnackBar
  ) {}

  canActivate(): Observable<boolean> {
    return this.authService.currentUser$.pipe(
      map((user) => {
        if (user) {
          return true;
        }
        this.snackbar.open('Insufficient permissions!', '', {
          duration: 2000,
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
        });
      })
    );
  }
}
