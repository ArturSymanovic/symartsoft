# Development Procedures

The application uses code-first migrations using Entity Framework Core and is configured to update database on startup as part of the CI/CD pipeline, therefore strict rules for adding migrations have to be enforsed:

- During development migrations should be added using the functions and environment variables specified in the below configuration. This will ensure that prior to deployment every change to database will documented and reviewed in pull requests using two sources:
    * As new migration .cs files
    * As changes to idempotent sql script
- Migrations applied to production database should never be removed or changed
- Production environment variables and connection strings must never be setup or used on developers machine to avoid accidental changes.

## Development environment onfiguration:

Add the following environment variables:

- ASPNETCORE_ENVIRONMENT=Development
- ConnectionStrings__symartsoft_dev=[Development_ConnectionString] (Note: on windows pay attention to potential double underscore vs colon issue)

Add the following functions to alias migration functions:

    add-migration () {
        dotnet-ef migrations add $1 -o Data/Migrations
        dotnet-ef migrations script --idempotent -o Data/Migrations/DatabaseChangesForReview.sql
    }

    remove-migration() {
        dotnet-ef migrations remove
        dotnet-ef migrations script --idempotent -o Data/Migrations/DatabaseChangesForReview.sql
    }

If on Windows:
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

