#!/bin/bash

#login to azure using system identity
az login --identity

# set connection string environment variable
export ConnectionStrings__symartsoft_prod=$(az keyvault secret show --name symartsof-prod-conn-string --vault-name SymartsoftKV --query value | sed 's/\"//g')

# retrieve key related secrets and remove double quotes
az keyvault secret show --name symartsoftkey --vault-name SymartsoftKV --query value | sed 's/\"//g' >> /app/symartsoftrawkey.txt
az keyvault secret show --name beginkey --vault-name SymartsoftKV --query value | sed 's/\"//g' >> /app/beginkey.txt
az keyvault secret show --name endkey --vault-name SymartsoftKV --query value | sed 's/\"//g' >> /app/endkey.txt

# retrieve certificate related secrets and remove double quotes
az keyvault secret show --name begin --vault-name SymartsoftKV --query value | sed 's/\"//g' >> /app/begin.txt
az keyvault secret show --name end --vault-name SymartsoftKV --query value | sed 's/\"//g' >> /app/end.txt
az keyvault secret show --name crt1 --vault-name SymartsoftKV --query value | sed 's/\"//g' >> /app/crt1.txt
az keyvault secret show --name crt2 --vault-name SymartsoftKV --query value | sed 's/\"//g' >> /app/crt2.txt
az keyvault secret show --name crt3 --vault-name SymartsoftKV --query value | sed 's/\"//g' >> /app/crt3.txt

# replace spaces with new lines
cat /app/symartsoftrawkey.txt | tr [:space:] '\n' | cat >> /app/symartsoftkey.txt
cat /app/crt1.txt | tr [:space:] '\n' | cat >> /app/crt11.txt
cat /app/crt2.txt | tr [:space:] '\n' | cat >> /app/crt22.txt
cat /app/crt3.txt | tr [:space:] '\n' | cat >> /app/crt33.txt

# combine certificate files into necessary PEM format
cat /app/begin.txt /app/crt11.txt /app/end.txt /app/begin.txt /app/crt22.txt /app/end.txt /app/begin.txt /app/crt33.txt /app/end.txt >> /etc/ssl/certs/symartsoftcrt.txt

# combine secret file
cat /app/beginkey.txt /app/symartsoftkey.txt /app/endkey.txt >> /etc/ssl/certs/symartsoftkey.txt

service nginx start
dotnet /app/API.dll