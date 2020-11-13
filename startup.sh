#!/bin/bash
az login --identity

az keyvault secret download --name symartsoftkey --vault-name SymartsoftKV --file symartsoftrawkey.txt
az keyvault secret download --name beginkey --vault-name SymartsoftKV --file beginkey.txt
az keyvault secret download --name endkey --vault-name SymartsoftKV --file endkey.txt

az keyvault secret download --name begin --vault-name SymartsoftKV --file begin.txt
az keyvault secret download --name end --vault-name SymartsoftKV --file end.txt
az keyvault secret download --name crt1 --vault-name SymartsoftKV --file crt1.txt
az keyvault secret download --name crt2 --vault-name SymartsoftKV --file crt2.txt
az keyvault secret download --name crt3 --vault-name SymartsoftKV --file crt3.txt

cat symartsoftrawkey.txt | tr [:space:] '\n' >> symartsoftkey.txt
cat crt1.txt | tr [:space:] '\n' >> crt1.crt
cat crt2.txt | tr [:space:] '\n' >> crt2.crt
cat crt3.txt | tr [:space:] '\n' >> crt3.crt

cat begin.txt <(echo) crt1.crt <(echo) end.txt <(echo) begin.txt <(echo) crt2.crt <(echo) end.txt <(echo) begin.txt <(echo) crt3.crt <(echo) end.txt <(echo) >> /etc/ssl/certs/symartsoft.crt
cat beginkey.txt <(echo) symartsoftkey.txt <(echo) endkey.txt <(echo) >> /etc/ssl/certs/symartsoft.key

cat /etc/ssl/certs/symartsoft.crt
cat /etc/ssl/certs/symartsoft.key

service nginx start
dotnet /app/API.dll
