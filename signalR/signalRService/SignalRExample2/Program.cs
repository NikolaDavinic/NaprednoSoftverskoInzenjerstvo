using Microsoft.AspNetCore.SignalR;
using Microsoft.Net.Http.Headers;
using SignalRExample2;
using SignalRExample2.Hubs;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddSignalR();

builder.Services.AddSingleton<UserHub>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(x => x
  .AllowAnyMethod()
  .AllowAnyHeader()
  .SetIsOriginAllowed(origin => true) // allow any origin
  .AllowCredentials()); // allow credentials+

app.UseRouting();

app.MapHub<UserHub>("userHub");

app.UseEndpoints(endpoints =>
{
    endpoints.MapGet("/", async context =>
    {
        await context.Response.WriteAsync("SignalR server is running");
    });
});

app.Run();
