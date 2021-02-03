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
  cssSnippet: string = `.blogpost-container {
  display: flex; flex-wrap: wrap; justify-content: center; margin-left: 16px; margin-right: 16px;
}

.blogpost-header {
  flex-basis: 100%;
  text-align: center;
}

.blogpost-body {
  max-width: 1200px;
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
}

h2, p {
  flex-basis: 100%;
}`;
  htmlSnippet=`
<!DOCTYPE html>
<html lang="en">
<head>

<script>
	// Just a lil’ script to show off that inline JS gets highlighted
	window.console && console.log('foo');
</script>
<meta charset="utf-8" />
<link rel="icon" href="assets/favicon.png" />
<title>Prism</title>
<link rel="stylesheet" href="assets/style.css" />
<link rel="stylesheet" href="themes/prism.css" data-noprefix />
<script src="assets/prefixfree.min.js"></script>

<script>var _gaq = [['_setAccount', 'UA-33746269-1'], ['_trackPageview']];</script>
<script src="https://www.google-analytics.com/ga.js" async></script>
</head>
  `;
  csharpSnippet=`
using System.Security.Claims;

namespace API.Extensions
{
    public static class ClaimsPrincipalExtensions
    {
        public static string GetUserName(this ClaimsPrincipal user)
        {
            return user.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        }
    }
}
  `;
  jsSnippet=`
var txt = "";
var numbers = [45, 4, 9, 16, 25];
numbers.forEach(myFunction);

function myFunction(value, index, array) {
  txt = txt + value + "<br>";
}
  `;
  tsSnippet=`
@Component({
  selector: 'app-formatted-code',
  templateUrl: './formatted-code.component.html',
  styleUrls: ['./formatted-code.component.css'],
})
export class FormattedCodeComponent implements OnInit {
  @Input() language: string = \`clike\`;
  @Input() code: string = \`\`;
  tokenisedCode = \`\`;
  languageClass: string = \`\`;
  languageEnum: any; 
  `;
  dockerSnippet=`
FROM mcr.microsoft.com/dotnet/sdk:5.0.102-ca-patch-buster-slim-amd64 AS build
WORKDIR /app

# copy sln and csproj files into the image
COPY *.sln .
COPY API/API.csproj ./API/
COPY API.Tests/API.Tests.csproj ./API.Tests/
COPY --from=build-client /app/client/dist ./API/wwwroot

# restore package dependencies for the solution	
RUN dotnet restore

# copy full solution over
COPY . .

# build the solution
RUN dotnet build

# create a new layer from the build 
FROM build AS test

# set the working directory to be the web api testing project
WORKDIR /app/API.Tests

# run tests
RUN dotnet test
  `;
  bashSnippet=`
  #!/bin/bash

  #login to azure using system identity
  az login --identity
  
  # set connection string environment variable
  export ConnectionStrings__symartsoft_prod=$(az keyvault secret show --name symartsof-prod-conn-string --vault-name SymartsoftKV --query value | sed 's/\"//g')
  export SymartsoftTokenKey=$(az keyvault secret show --name SymartsoftTokenKey --vault-name SymartsoftKV --query value | sed 's/\"//g')
  
  # retrieve key related secrets and remove double quotes
  az keyvault secret show --name symartsoftkey --vault-name SymartsoftKV --query value | sed 's/\"//g' >> /app/symartsoftrawkey.txt
  az keyvault secret show --name beginkey --vault-name SymartsoftKV --query value | sed 's/\"//g' >> /app/beginkey.txt
  az keyvault secret show --name endkey --vault-name SymartsoftKV --query value | sed 's/\"//g' >> /app/endkey.txt
  az keyvault secret show --name DpKey --vault-name SymartsoftKV --query value | sed 's/\"//g' >> /app/DpKey.txt  
  `;
  sqlSnippet=`
IF OBJECT_ID(N'[__EFMigrationsHistory]') IS NULL
BEGIN
    CREATE TABLE [__EFMigrationsHistory] (
        [MigrationId] nvarchar(150) NOT NULL,
        [ProductVersion] nvarchar(32) NOT NULL,
        CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY ([MigrationId])
    );
END;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20201203172158_AddIdentity')
BEGIN
    CREATE TABLE [AspNetRoles] (
        [Id] nvarchar(450) NOT NULL,
        [Name] nvarchar(256) NULL,
        [NormalizedName] nvarchar(256) NULL,
        [ConcurrencyStamp] nvarchar(max) NULL,
        CONSTRAINT [PK_AspNetRoles] PRIMARY KEY ([Id])
    );
END;
GO
  `;
  constructor() { }

  ngOnInit(): void {
  }

}
