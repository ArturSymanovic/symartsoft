import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiRoutesService } from 'src/app/_services/api-routes.service';

@Component({
  selector: 'app-test-errors',
  templateUrl: './test-errors.component.html',
  styleUrls: ['./test-errors.component.css'],
})
export class TestErrorsComponent implements OnInit {
  constructor(
    private apiRoutes: ApiRoutesService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {}

  getGeneric400error() {
    this.http.get(this.apiRoutes.error400Url()).subscribe({
      error: (error) => console.log(error),
    });
  }

  getValidation400error() {
    this.http.post(this.apiRoutes.errorValidation400Url(), {}).subscribe({
      error: (error) => console.log(error),
    });
  }

  get401error() {
    this.http.get(this.apiRoutes.error401Url()).subscribe({
      error: (error) => console.log(error),
    });
  }

  get404error() {
    this.http.get(this.apiRoutes.error404Url()).subscribe({
      error: (error) => console.log(error),
    });
  }

  get500error() {
    this.http.get(this.apiRoutes.error500Url()).subscribe({
      error: (error) => console.log(error),
    });
  }
}
