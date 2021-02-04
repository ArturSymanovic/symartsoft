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

  constructor() { }

  ngOnInit(): void {
  }

}
