import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiRoutesService } from './api-routes.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private apiRoutes: ApiRoutesService) { }

  register(model: any){
    return this.http.post(this.apiRoutes.registerUrl(), model);
  }
}
