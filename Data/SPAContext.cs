using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Webdev___Project_2.Models;

namespace Webdev___Project_2.Data
{
    public class SPAContext : DbContext
    {
        public SPAContext (DbContextOptions<SPAContext> options)
            : base(options)
        {
        }

        public DbSet<Webdev___Project_2.Models.Category> Category { get; set; } = default!;

        public DbSet<Webdev___Project_2.Models.UFO_sighting> UFO_sighting { get; set; }
    }
}
