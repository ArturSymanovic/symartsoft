import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiRoutesService {
  baseUrl = environment.apiUrl;
  constructor() { }

  registerUrl(): string{
    return this.baseUrl + `account/register`;
  }

  loginUrl(): string{
    return this.baseUrl + `account/login`;
  }

  error400Url(): string{
    return this.baseUrl + `erroremitting/badrequest`;
  }

  errorValidation400Url(): string{
    return this.baseUrl + `account/login`;
  }

  error401Url(): string{
    return this.baseUrl + `erroremitting/unauthorized`;
  }

  error404Url(): string{
    return this.baseUrl + `erroremitting/notfound`;
  }

  error500Url(): string{
    return this.baseUrl + `erroremitting/servererror`;
  }

}
