using System;
using API.Data;
using API.Interfaces;
using API.Services;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace API.Extensions
{
    public static class ApplicationServiceExtentions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IWebHostEnvironment env)
        {
            services.AddScoped<ITokenService, TokenService>();

            var connectionString ="";
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


            return services;
        }
    }
}