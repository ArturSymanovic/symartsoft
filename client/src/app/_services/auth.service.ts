import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = 'http://localhost:5000/api/';

  constructor(private http: HttpClient) { }

  register(model: any){
    return this.http.post(this.baseUrl + 'account/register', model);
  }
}
