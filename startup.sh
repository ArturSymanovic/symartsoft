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

# retrieve certificate related secrets and remove double quotes
az keyvault secret show --name begin --vault-name SymartsoftKV --query value | sed 's/\"//g' >> /app/begin.txt
az keyvault secret show --name end --vault-name SymartsoftKV --query value | sed 's/\"//g' >> /app/end.txt
az keyvault secret show --name crt1 --vault-name SymartsoftKV --query value | sed 's/\"//g' >> /app/crt1.txt
az keyvault secret show --name crt2 --vault-name SymartsoftKV --query value | sed 's/\"//g' >> /app/crt2.txt
az keyvault secret show --name crt3 --vault-name SymartsoftKV --query value | sed 's/\"//g' >> /app/crt3.txt
az keyvault secret show --name DpCert --vault-name SymartsoftKV --query value | sed 's/\"//g' >> /app/DpCert.txt

# replace spaces with new lines
cat /app/symartsoftrawkey.txt | tr [:space:] '\n' | cat >> /app/symartsoftkey.txt
cat /app/crt1.txt | tr [:space:] '\n' | cat >> /app/crt11.txt
cat /app/crt2.txt | tr [:space:] '\n' | cat >> /app/crt22.txt
cat /app/crt3.txt | tr [:space:] '\n' | cat >> /app/crt33.txt
cat /app/DpKey.txt | tr [:space:] '\n' | cat >> /app/DpKey1.txt
cat /app/DpCert.txt | tr [:space:] '\n' | cat >> /app/DpCert1.txt

# combine certificate files into necessary PEM format file
cat /app/begin.txt /app/crt11.txt /app/end.txt /app/begin.txt /app/crt22.txt /app/end.txt /app/begin.txt /app/crt33.txt /app/end.txt >> /etc/ssl/certs/symartsoftcrt.txt

# combine certificate key file into necessary PEM format file
cat /app/beginkey.txt /app/symartsoftkey.txt /app/endkey.txt >> /etc/ssl/certs/symartsoftkey.txt

# combine data protection key and certificate into PEM format files
cat /app/beginkey.txt /app/DpKey1.txt /app/endkey.txt >> /app/DpKey2.txt
cat /app/begin.txt /app/DpCert1.txt /app/end.txt >> /app/DpCert2.txt

# create pfx certificate for data protection
openssl pkcs12 -export -out /app/certificate.pfx -inkey /app/DpKey2.txt -in /app/DpCert2.txt -passout pass:

service nginx start
dotnet /app/API.dll
echo "dotnet exited with code" $?