import { Component, OnInit } from '@angular/core';
import 'prismjs/prism';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-sql';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-docker';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-csharp';
declare var Prism: any;
@Component({
  selector: 'app-asp-angular-project',
  templateUrl: './asp-angular-project.component.html',
  styleUrls: ['./asp-angular-project.component.css']
})
export class AspAngularProjectComponent implements OnInit {
  createAPIProjectSnippet = `
dotnet new webapi -o API --no-https
  `;
  apiBaseSnippet = `
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ApiBaseController: ControllerBase
    {    
    }
}  
  `;
  productSnippet =`
namespace API.Models
{
    public class Product
    {
        public string Name { get; set; }
        public float Price { get; set; }
        public string Currency { get; set; }
    }
} 
  `;
  productsControllerSnippet =`
using System.Collections.Generic;
using API.Models;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ProductsController: ApiBaseController
    {
        [HttpGet("getall")]
        public IEnumerable<Product> GetAll()
        {
            var products = new List<Product>();
            products.Add(new Product {Name = "Box of apples", Price = 15.25f, Currency = "USD"});
            products.Add(new Product {Name = "Large watermelon", Price = 30.18f, Currency = "USD"});
            products.Add(new Product {Name = "Cucumber", Price = 5.84f, Currency = "USD"});
            return products.ToArray();
        }
    }
}
  `;
  dotnetWatchSnippet = `
dotnet watch run
  `;
  responseBodySnippet = `
[
  {
    "name": "Box of apples",
    "price": 15.25,
    "currency": "USD"
  },
  {
    "name": "Large watermelon",
    "price": 30.18,
    "currency": "USD"
  },
  {
    "name": "Cucumber",
    "price": 5.84,
    "currency": "USD"
  }
]
  `;
  createAngularSnippet=`
ng new client --skip-git --skip-tests --style css --routing true
  `;
  initialHtmlSnippet=`
<h1>Welcome to Shopping Portal</h1>
<router-outlet></router-outlet>
  `;
  ngServeSnippet=`
ng serve
  `;
  configureCorsSnippet=`
public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
{
    if (env.IsDevelopment())
    {
        app.UseDeveloperExceptionPage();
        app.UseSwagger();
        app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "API v1"));
    }

    app.UseRouting();
    
    app.UseCors(policy =>
    {
        policy.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:4200");
    });

    app.UseAuthorization();

    app.UseEndpoints(endpoints =>
    {
        endpoints.MapControllers();
    });
}  
  `;
  environmentSnippet=`
export const environment = {
  production: false,
  apiUrl: 'http://localhost:5000/api/',
};
  `;
  createServiceSnippet=`
ng g s _services/api-routes
  `;
  apiRoutesSnippet=`
  import { Injectable } from '@angular/core';
  import { environment } from 'src/environments/environment';
  @Injectable({
    providedIn: 'root'
  })
  export class ApiRoutesService {
    baseUrl = environment.apiUrl;
    constructor() { }
  
    getAllProductsUrl() {
      return this.baseUrl + \`products/getall\`;
    }
  } 
  `;
  createProductSnippet=`
ng g i _interfaces/product
  `;
  productInterfaceSnippet=`
export interface Product {
  name: string,
  price: number,
  currency: string
}
  `;
  createProductsServiceSnippet=`
ng g s _services/products
  `;
  productsServiceSnippet=`
import { Injectable } from '@angular/core';
import { Product } from '../_interfaces/product';
import { ApiRoutesService } from './api-routes.service';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient, private apiRoutes: ApiRoutesService) {}
  getAllProducts() {
    return this.http.get<Product[]>(this.apiRoutes.getAllProductsUrl());
  }
}
  `;
  appModuleSnippet=`
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
  `;
  appComponentSnippet=`
import { Component, OnInit } from '@angular/core';
import { Product } from './_interfaces/product';
import { ProductsService } from './_services/products.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  products: Product[] = [];
  title = 'Shopping Portal';

  constructor(private productsService: ProductsService) {}
  ngOnInit(): void {
    this.productsService.getAllProducts().subscribe({
      next: (receivedProducts) => {
        this.products = receivedProducts;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
  `;
  appComponentHtmlSnippet=`
<h1>Welcome to Shopping Portal</h1>
<div *ngIf="products.length == 0;else productsTemplate">
    <h4>There are no products!</h4>
</div>
<ng-template #productsTemplate>
    <h4>Products:</h4>
    <ul>
        <li *ngFor="let product of products">
            Name: {{ product.name }}, Price: {{ product.price}}{{ product.currency }}
        </li>
    </ul>
</ng-template>
  `;
  cdAPISnippet=`
cd API
  `;
  cdClientSnippet=`
cd client
  `;
  angularJsonBeforeSnippet=`
  "root": "",
  "sourceRoot": "src",
  "prefix": "app",
  "architect": {
    "build": {
      "builder": "@angular-devkit/build-angular:browser",
      "options": {
        "outputPath": "dist/client",
  `;
  angularJsonAfterSnippet=`
  "root": "",
  "sourceRoot": "src",
  "prefix": "app",
  "architect": {
    "build": {
      "builder": "@angular-devkit/build-angular:browser",
      "options": {
        "outputPath": "../API/wwwroot",
  `;
  angularBuildSnippet=`
ng build --prod
  `;
  fallbackControllerSnippet=`
using System.IO;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class FallbackController: Controller
    {
        public ActionResult Index()
        {
            return PhysicalFile(Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "index.html"), "text/HTML");
        }
    }
}
  `;
  finalConfigureMethodSnippet=`
public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
{
    if (env.IsDevelopment())
    {
        app.UseDeveloperExceptionPage();
        app.UseSwagger();
        app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "API v1"));
    }

    app.UseRouting();
    
    app.UseCors(policy =>
    {
        policy.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:4200");
    });

    app.UseAuthorization();
    
    app.UseDefaultFiles();
    app.UseStaticFiles();
    app.UseEndpoints(endpoints =>
    {
        endpoints.MapControllers();
        endpoints.MapFallbackToController("Index", "Fallback");
    });
}
  `;

  constructor() { }

  ngOnInit(): void {
  }

}
