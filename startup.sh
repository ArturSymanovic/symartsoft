#!/bin/bash
az login --identity

az keyvault secret download --name symartsoftkey --vault-name SymartsoftKV --file /app/symartsoftrawkey.txt
az keyvault secret download --name beginkey --vault-name SymartsoftKV --file /app/beginkey.txt
az keyvault secret download --name endkey --vault-name SymartsoftKV --file /app/endkey.txt

az keyvault secret download --name begin --vault-name SymartsoftKV --file /app/begin.txt
az keyvault secret download --name end --vault-name SymartsoftKV --file /app/end.txt
az keyvault secret download --name crt1 --vault-name SymartsoftKV --file /app/crt1.txt
az keyvault secret download --name crt2 --vault-name SymartsoftKV --file /app/crt2.txt
az keyvault secret download --name crt3 --vault-name SymartsoftKV --file /app/crt3.txt

cat /app/symartsoftrawkey.txt | tr [:space:] '\n' >> /app/symartsoftkey.txt
cat /app/crt1.txt | tr [:space:] '\n' >> /app/crt1.crt
cat /app/crt2.txt | tr [:space:] '\n' >> /app/crt2.crt
cat /app/crt3.txt | tr [:space:] '\n' >> /app/crt3.crt

echo "" >> /app/nl

cat /app/begin.txt /app/nl /app/crt1.crt /app/nl /app/end.txt /app/nl /app/begin.txt /app/nl /app/crt2.crt /app/nl /app/end.txt /app/nl /app/begin.txt /app/nl /app/crt3.crt /app/nl /app/end.txt /app/nl >> /etc/ssl/certs/symartsoft.crt
cat /app/beginkey.txt /app/nl /app/symartsoftkey.txt /app/nl /app/endkey.txt /app/nl >> /etc/ssl/certs/symartsoft.key

cat /etc/ssl/certs/symartsoft.crt
cat /etc/ssl/certs/symartsoft.key

service nginx start
dotnet /app/API.dll
