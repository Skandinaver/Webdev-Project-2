using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Webdev___Project_2.Data;
using Webdev___Project_2.Models;
using Microsoft.Extensions.Hosting.Internal;
using System.Text;
using Microsoft.AspNetCore.Identity;
using System;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<SPAContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("SPAContext") ?? throw new InvalidOperationException("Connection string 'SPAContext' not found.")));

// Add services to the container.

builder.Services.AddControllersWithViews();
builder.Services.AddDefaultIdentity<IdentityUser>
    (options =>
    {
        options.SignIn.RequireConfirmedAccount = true;
        options.Password.RequireDigit = false;
        options.Password.RequiredLength = 6;
        options.Password.RequireNonAlphanumeric = false;
        options.Password.RequireUppercase = false;
        options.Password.RequireLowercase = false;
    })
.AddEntityFrameworkStores<SPAContext>();

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;

    var context = services.GetRequiredService<SPAContext>();
    context.Database.EnsureDeleted();
    context.Database.EnsureCreated();
    SeedData.Initialize(services);
    // DbInitializer.Initialize(context);
}


// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
    
}


app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();
app.UseAuthentication();
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Categories}/{action=Index}/{id?}");

app.MapGet("/debug/routes", (IEnumerable<EndpointDataSource> endpointSources) =>
        string.Join("\n", endpointSources.SelectMany(source => source.Endpoints)));
app.Run();
