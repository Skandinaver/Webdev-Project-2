using System;
using System.Collections.Generic;
using System.Composition;
using System.Linq;
using System.Reflection.Emit;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging.Console;
using Webdev___Project_2.Models;

namespace Webdev___Project_2.Data
{
    public class SPAContext : IdentityDbContext<IdentityUser>
    {
        //LoggerFactory object
        public readonly ILoggerFactory loggerFactory;

        public SPAContext (DbContextOptions<SPAContext> options, ILoggerFactory? loggerFactory)
            : base(options)
        {
            if (loggerFactory != null) {
                this.loggerFactory = loggerFactory.AddFile("logs/logfile.txt");
            }
            
        }

        public DbSet<Webdev___Project_2.Models.Category> Category { get; set; } = default!;

        public DbSet<Webdev___Project_2.Models.UFO_sighting> UFO_sighting { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseLoggerFactory(loggerFactory)  //tie-up DbContext with LoggerFactory object
                .EnableSensitiveDataLogging();                
        }
    }
}
