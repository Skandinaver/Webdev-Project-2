using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Emit;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Webdev___Project_2.Models;

namespace Webdev___Project_2.Data
{
    public class SPAContext : IdentityDbContext<IdentityUser>
    {
        public SPAContext (DbContextOptions<SPAContext> options)
            : base(options)
        {
        }

        public DbSet<Webdev___Project_2.Models.Category> Category { get; set; } = default!;

        public DbSet<Webdev___Project_2.Models.UFO_sighting> UFO_sighting { get; set; }
    }
}
