using Microsoft.CodeAnalysis.FlowAnalysis.DataFlow;
using Microsoft.EntityFrameworkCore;
using Webdev___Project_2.Data;


namespace Webdev___Project_2.Models
{
    public class SeedData
    {

        public static void Initialize(IServiceProvider serviceProvider)
        {

            using (var context = new SPAContext(
                serviceProvider.GetRequiredService<
                    DbContextOptions<SPAContext>>()))
            {
                if (context == null || context.Category == null)
                {
                    throw new ArgumentNullException("Null SPAContext");
                }
                //Look for categories
                if(context.Category.Any())
                {
                    return; // Database already seeded
                }

                context.Category.AddRange(
                    new Category
                    {
                        Category_name = "Close Encounter of the First Kind"
                    },
                    new Category
                    {
                        Category_name = "Close Encounter of the Second Kind"
                    },
                    new Category
                    {
                        Category_name = "Close Encounter of the Third Kind"
                    },
                    new Category
                    {
                        Category_name = "Close Encounter of the Fourth Kind"
                    },
                    new Category
                    {
                        Category_name = "Close Encounter of the Fifth Kind"
                    }
                    );
                context.SaveChanges();
            }

            using (var context = new SPAContext(
               serviceProvider.GetRequiredService<
                   DbContextOptions<SPAContext>>()))
            {
                if (context == null || context.UFO_sighting == null)
                {
                    throw new ArgumentNullException("Null SPAContext");
                }
                //Look for categories
                if (context.UFO_sighting.Any())
                {
                    return; // Database already seeded
                }

                var categoryQuery = from c in context.Category
                                    where c.Category_name == "Close Encounter of the Second Kind"
                                    select c;
                var seed_category = categoryQuery.First();
                context.UFO_sighting.AddRange(
                   new UFO_sighting
                   {
                       CategoryID = seed_category.ID,
                       Category = seed_category,
                       UFO_title = "Sighting at Roswell",
                       longitude = -104.534897m,
                       latitude = 33.400322m,
                       Observation_date = new DateTime(1947, 6, 4),
                       Description = "UFO observed crashing near Roswell, New Mexico.",
                   }
                    ); 
                context.SaveChanges();
            }
        }

    }
}
