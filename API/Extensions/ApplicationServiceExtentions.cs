using System;
using System.IO;
using System.Security.Cryptography.X509Certificates;
using System.Text.RegularExpressions;
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
            var dataProtectionCertificatePath = "";
            if (env.IsDevelopment())
            {
                connectionString = Environment.GetEnvironmentVariable("ConnectionStrings__symartsoft_dev");
                dataProtectionCertificatePath="./certificate.pfx";
            }
            if (env.IsProduction())
            {
                connectionString = connectionString = Environment.GetEnvironmentVariable("ConnectionStrings__symartsoft_prod");
                dataProtectionCertificatePath="/app/certificate.pfx";
            }
            services.AddDbContext<DataContext>(options =>
            {
                options.UseSqlServer(connectionString);
            });

            var store = new X509Store(StoreName.My, StoreLocation.CurrentUser);
             
            store.Open(OpenFlags.ReadWrite);            
            X509Certificate2 cert = new X509Certificate2(dataProtectionCertificatePath);      
            store.Add(cert);
            services.AddDataProtection()
                .PersistKeysToDbContext<DataContext>()
                .ProtectKeysWithCertificate(cert);
            store.Close();

            return services;
        }
    }
}