import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiRoutesService } from './api-routes.service';
import { map } from 'rxjs/operators'
import { User } from '../_models/user';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSource=new ReplaySubject<User>(1);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient, private apiRoutes: ApiRoutesService) { }

  register(model: any){
    return this.http.post(this.apiRoutes.registerUrl(), model);
  }

  login(model: any){
    return this.http.post(this.apiRoutes.loginUrl(), model).pipe(
      map((response: User) => {
        const user = response;
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user);
        }
      })
    );
  }

  setCurrentUser(user: User){
    this.currentUserSource.next(user);
  }

  logout(){
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }

}
