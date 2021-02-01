using System;
using API.Models.Auth;
using Microsoft.AspNetCore.DataProtection.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace API.Data
{
    public class DataContext : IdentityDbContext<AppUser, AppRole, string, AppUserClaim,
        AppUserRole, AppUserLogin, AppRoleClaim, AppUserToken>, IDataProtectionKeyContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<WeatherForecast> WeatherForecasts { get; set; }

        public DbSet<DataProtectionKey> DataProtectionKeys { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<AppUser>()
                .HasMany(ur => ur.UserRoles)
                .WithOne(u => u.User)
                .HasForeignKey(ur => ur.UserId)
                .IsRequired();

            builder.Entity<AppRole>()
                .HasMany(ur => ur.UserRoles)
                .WithOne(r => r.Role)
                .HasForeignKey(ur => ur.RoleId)
                .IsRequired();
        }
    }

    
    public class DataFactory : IDesignTimeDbContextFactory<DataContext>
    {
        public DataContext CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<DataContext>();
            var env = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");
            string connString = "";
            if (env == "Development")
            {
                connString = Environment.GetEnvironmentVariable("ConnectionStrings__symartsoft_dev");
            }                
            if (env == "Production")
            {
                connString = Environment.GetEnvironmentVariable("ConnectionStrings__symartsoft_prod");
            }
            optionsBuilder.UseSqlServer(Environment.GetEnvironmentVariable(connString));

            return new DataContext(optionsBuilder.Options);
        }
    }
}