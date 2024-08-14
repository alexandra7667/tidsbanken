using Backend;
using Backend.Controllers;
using Backend.Repositories;
using Backend.Data;
using Microsoft.EntityFrameworkCore;
using backend.Repositories;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddControllers();

builder.Services.AddDbContext<Context>(opt =>
    {
        opt.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnectionString"));
    });

builder.Services.AddScoped<IUserRepository, UserRepository>();

// CORS configuration
builder.Services.AddCors(options =>
{
    options.AddPolicy("CorsPolicy",
        builder => builder
            .AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader());
});

var app = builder.Build();


app.UseSwagger();
app.UseSwaggerUI();

app.UseCors("CorsPolicy");
app.UseHttpsRedirection();
app.ConfigureUserApi();
app.ConfigureLoginApi();
app.ConfigureVacationRequestApi();
app.ConfigureCommentApi();
app.ConfigureSettingsApi();
app.ConfigureIneligibleApi();
//app.ApplyProjectMigrations();
app.Run();

public partial class Program { } // needed for testing - please ignore