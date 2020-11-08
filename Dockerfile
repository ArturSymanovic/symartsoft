FROM node:14.15.0 AS build-client

# install chrome for protractor tests
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
RUN sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list'
RUN apt-get update && apt-get install -yq google-chrome-stable

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/client/node_modules/.bin:$PATH

# install and cache app dependencies
COPY client/package.json /app/client/package.json
WORKDIR /app/client
RUN npm install
RUN npm install -g @angular/cli

# add app
COPY . /app

# run tests
RUN ng test --watch=false
RUN ng e2e --port 4202

# build app
RUN ng build --prod --output-path=dist

FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
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

# create a new layer from the test
FROM test AS publish

# set the working directory to be the web api project
WORKDIR /app/API

# publish the web api project to a directory called out
RUN dotnet publish -c Release -o out

# create a new layer using the cut-down aspnet runtime image
FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS runtime
WORKDIR /app

# copy over the files produced when publishing the service
COPY --from=publish /app/API/out ./

# expose port 80 as our application will be listening on this port (dictated by microsoft asp runtime container and can be overriden using ENV ASPNETCORE_URLS http://+:80 )
EXPOSE 80

# run the web api when the docker image is started
ENTRYPOINT ["dotnet", "MyAPI.dll"]