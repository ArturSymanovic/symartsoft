#!/bin/bash
az login --identity
az keyvault secret show --name SampleSecret --vault-name SymartsoftKV --query value
service nginx start
dotnet /app/API.dll
