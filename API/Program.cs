using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Serilog;
using Serilog.Sinks.MSSqlServer;

namespace API
{

    
    public class Program
    {
        public static void Main(string[] args)
        {
            var env = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");
            string connString = "";
            string configurationFile = "";
            if (env == "Development")
            {
                connString = Environment.GetEnvironmentVariable("ConnectionStrings__symartsoft_dev");
                configurationFile = "appsettings.Development.json";
            }                
            if (env == "Production")
            {
                connString = Environment.GetEnvironmentVariable("ConnectionStrings__symartsoft_prod");
                configurationFile = "appsettings.json";
            }
            var configuration = new ConfigurationBuilder()
                .AddJsonFile(configurationFile)
                .Build();
 
            Log.Logger = new LoggerConfiguration()
                .ReadFrom.Configuration(configuration)
                .WriteTo
                .MSSqlServer(
                    connectionString: connString,
                    sinkOptions: new MSSqlServerSinkOptions 
                    { 
                        TableName = "Logs",
                        AutoCreateSqlTable = true, 
                    },
                    restrictedToMinimumLevel: Serilog.Events.LogEventLevel.Warning)
                .CreateLogger();

            Log.Information("Starting DB migration");            
            var optionsBuilder = new DbContextOptionsBuilder<DataContext>();
            optionsBuilder.UseSqlServer(connString);
            var dbContext = new DataContext(optionsBuilder.Options);
            dbContext.Database.Migrate();
            dbContext.Dispose();
            Log.Information("Finished DB migration");
            
            try
            {
                Log.Information("Starting application");
                CreateHostBuilder(args).Build().Run();                
            }
            catch (Exception ex)
            {
                Log.Fatal(ex, "Failed to start application");
                throw;
            }
            finally
            {
                Log.CloseAndFlush();
            }
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();                   
                })
                .UseSerilog();
    }
}
