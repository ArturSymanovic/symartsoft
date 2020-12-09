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
}
