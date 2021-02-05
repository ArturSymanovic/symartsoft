# Development Environment Setup

## Linux Ubuntu 20.04

* Install DotNet 5 (via snap)
    * Create the following symbolic link to avoid getting snap related VS Code extensions issues
    ```sh
     sudo ln -sv /snap/dotnet-sdk/current/dotnet /usr/local/bin/dotnet
    ```
* Install Docker
* Install Azure CLI
* Install Node
* INstall Angular
* Install Entity Framework CLI tool
* Install VS Code with the following extensions
    * Angular Language Service
    * Angular Snippets (John Papa)
    * Bracket Pair Colorizer 2
    * C#
    * C# Extensions
    * Coverage Gutters (ryanluker)
    * Docker
    * Material Icon Theme
    * NuGet Gallery
    * Prettier
    * Sql Server
    * XML Tools 
* Setup the folloving environment variables
    * export ConnectionStrings__symartsoft_dev="CONN_STRING"
        * Azure SQL should be configured to allow connections from your IP address
    * export PATH="$PATH:/home/{{USER}}/.dotnet/tools"
    * export DOTNET_ROOT="/snap/dotnet-sdk/current/"
    * export ASPNETCORE_ENVIRONMENT=Development
    * export SymartsoftTokenKey="JWT_FOR_TOKEN_GENERATION"
* Add the following aliases to command line for database migrations:
    ```sh
    add-migration () {
        dotnet-ef migrations add $1 -o Data/Migrations
        dotnet-ef migrations script --idempotent -o Data/Migrations/DatabaseChangesForReview.sql
    }

    remove-migration() {
        dotnet-ef migrations remove
        dotnet-ef migrations script --idempotent -o Data/Migrations/DatabaseChangesForReview.sql
    }
    ```
* Clone github repository
* Using OpenSSL generate self signed certificate called certificate.pfx and place it into "API" folder. This certificate is used for Data Protection services when encrypting keys.

## Windows 10

* Perform equivalent steps for .NET 5 installation following official guidelines
* Perform equivalent steps for other components
* For environment variables setup pay attention to possible issues with connection strings (double underscore vs colon)
    * PATH and DOTNET_ROOT are not needed in this case
* Add functions to Powershell profile (can be found using "$Profile" command) for adding db migrations:
    ```sh
    function add-migration {
        dotnet-ef migrations add $args[0] -o Data/Migrations
        dotnet-ef migrations script --idempotent -o Data/Migrations/DatabaseChangesForReview.sql
    }

    function remove-migration {
        dotnet-ef migrations remove
        dotnet-ef migrations script --idempotent -o Data/Migrations/DatabaseChangesForReview.sql
    }
    ```
* Clone github repository
* Using OpenSSL generate self signed certificate called certificate.pfx and place it into "API" folder. (Or copy existing certificate) This certificate is used for Data Protection services when encrypting keys.
