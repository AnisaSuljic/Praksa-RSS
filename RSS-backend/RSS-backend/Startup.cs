using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using RSS_backend.Database;
using RSS_backend.Filters;
using RSS_backend.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RSS_backend
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            services.AddControllers(x=>
            {
                x.Filters.Add<ErrorFilter>();
            });
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "RSS_backend", Version = "v1" });
            });

            services.AddDbContext<FakturaContext>(options =>
            {
                options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection"));
            });
            services.AddAutoMapper(typeof(Startup));


            services.AddScoped<IJedinicaMjereService, JedinicaMjereService>();
            services.AddScoped<IKlijentService, KlijentService>();
            services.AddScoped<IKorisnikService, KorisnikService>();
            services.AddScoped<IVrstaService, VrstaService>();
            services.AddScoped<IGrupaService, GrupaService>();
            services.AddScoped<IProizvodjacService, ProizvodjacService>();
            services.AddScoped<IArtiklService, ArtiklService>();
            services.AddScoped<IKupacService, KupacService>();
            services.AddScoped<IGradService, GradService>();
            services.AddScoped<IRacunService, RacunService>();
            services.AddScoped<IVrstaPlacanjaService, VrstaPlacanjaService>();
            services.AddScoped<ISkladisteService, SkladisteService>();
            services.AddScoped<IValutaService, ValutaService>();
            services.AddScoped<IDokumentService, DokumentService>();
            services.AddScoped<IStavkeService, StavkeService>();
            services.AddScoped<IPorezService, PorezService>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "RSS_backend v1"));
            }


            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
