using Microsoft.EntityFrameworkCore;
using react_backend.Models;


var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddCors(o => o.AddPolicy("MyPolicy", builder =>
{
    builder.AllowAnyOrigin()
           .AllowAnyMethod()
           .AllowAnyHeader();
}));

builder.Services.AddDbContext<GameWinnerContext>(opt =>
    opt.UseInMemoryDatabase("GameWinners"));

builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen();




var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.UseCors();

app.Run();
