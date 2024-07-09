using Crud_api.Data;
using Crud_api.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

// Configure Swagger/OpenAPI
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Set up custom URL
builder.WebHost.UseUrls(Constants.Url);

// Enable Cors
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", builder =>
    {
        builder.AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});

// Register the user service
builder.Services.AddScoped<IUserService, UserService>();

// Add DbContext with MySQL connection string
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseMySql(builder.Configuration.GetConnectionString("DefaultConnection"),
    new MySqlServerVersion(new Version(8, 0, 21))));

var app = builder.Build();

app.UseCors("AllowAll");

// Obtain a logger instance from the DI container
var logger = app.Services.GetRequiredService<ILogger<Program>>();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

// Log application start information
app.Lifetime.ApplicationStarted.Register(() =>
{
    Task.Run(async () =>
    {
        await Task.Delay(100);
        logger.LogInformation($"Application is running on: {Constants.Url}");
        logger.LogInformation($"Swagger URL: {Constants.Url}/swagger");
    });
});

app.Lifetime.ApplicationStarted.Register(() =>
{
    using (var scope = app.Services.CreateScope())
    {
        var dbContext = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
        try
        {
            dbContext.Database.CanConnect();
            logger.LogInformation("Connected to the database successfully.");
        }
        catch (Exception ex)
        {
            logger.LogError("Failed to connect to the database: " + ex.Message);
        }
    }
});

app.Run();