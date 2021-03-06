import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiRoutesService } from './api-routes.service';
import { map } from 'rxjs/operators';
import { User } from '../_models/user';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSource = new ReplaySubject<User | null>(1);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient, private apiRoutes: ApiRoutesService) {}

  register(model: any) {
    return this.http.post<User>(this.apiRoutes.registerUrl(), model).pipe(
      map((response: User) => {
        const user = response;
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user);
        }
      })
    );
  }

  login(model: any) {
    return this.http.post<User>(this.apiRoutes.loginUrl(), model).pipe(
      map((response: User) => {
        const user = response;
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user);
        }
      })
    );
  }

  setCurrentUser(user: User | null) {
    this.currentUserSource.next(user);
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }

  delete() {
    return this.http.delete(this.apiRoutes.deleteUrl()).pipe(
      map((response) => {
        localStorage.removeItem('user');
        this.currentUserSource.next(null);
      })
    );
  }
}
