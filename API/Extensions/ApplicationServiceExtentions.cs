using System;
using System.IO;
using System.Security.Cryptography.X509Certificates;
using API.Data;
using API.Helpers;
using API.Interfaces;
using API.Services;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Serilog;

namespace API.Extensions
{
    public static class ApplicationServiceExtentions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IWebHostEnvironment env)
        {
            services.AddScoped<ITokenService, TokenService>();

            var connectionString = "";
            if (env.IsDevelopment())
            {
                connectionString = Environment.GetEnvironmentVariable("ConnectionStrings__symartsoft_dev");
            }
            if (env.IsProduction())
            {
                connectionString = connectionString = Environment.GetEnvironmentVariable("ConnectionStrings__symartsoft_prod");
            }
            services.AddDbContext<DataContext>(options =>
            {
                options.UseSqlServer(connectionString);
            });

            using (var serviceProvider = services.BuildServiceProvider())
            {
                var db = serviceProvider.GetRequiredService<DataContext>();
                db.Database.Migrate();
            }

            //var store = new X509Store(StoreName.My, StoreLocation.CurrentUser);
            //store.Open(OpenFlags.ReadWrite);
            //store.Certificates.ImportFromPemFile("./DataProtection.txt");
            //Log.Warning("Certificate store count: " + store.Certificates.Count.ToString());
            //Log.Warning("store.Certificates[0].GetRawCertDataString(): " + store.Certificates[0].GetRawCertDataString());  
            //Log.Warning("store.Certificates[0].SubjectName: " + store.Certificates[0].SubjectName);
            X509Certificate2 cert = new X509Certificate2(X509Certificate.CreateFromCertFile("./DataProtection.txt"));
            services.AddDataProtection()
                .PersistKeysToDbContext<DataContext>()
                .ProtectKeysWithCertificate((X509Certificate2)cert);
            //store.Close();

            return services;
        }
    }
}