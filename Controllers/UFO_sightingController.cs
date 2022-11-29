using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Webdev___Project_2.Data;
using Webdev___Project_2.Models;

namespace Webdev___Project_2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UFO_sightingController : ControllerBase
    {
        private readonly SPAContext _context;

        public UFO_sightingController(SPAContext context)
        {
            _context = context;
        }

        // GET: api/UFO_sighting
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UFO_sighting>>> GetUFO_sighting()
        {
            return await _context.UFO_sighting.Include(c => c.Category).ToListAsync();
        }

        // GET: api/UFO_sighting/5
        [HttpGet("{id}")]
        public async Task<ActionResult<UFO_sighting>> GetUFO_sighting(int id)
        {
            var uFO_sighting = await _context.UFO_sighting.FindAsync(id);

            if (uFO_sighting == null)
            {
                return NotFound();
            }

            return uFO_sighting;
        }

        // PUT: api/UFO_sighting/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUFO_sighting(int id, UFO_sighting uFO_sighting)
        {
            if (id != uFO_sighting.ID)
            {
                return BadRequest();
            }

            _context.Entry(uFO_sighting).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UFO_sightingExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/UFO_sighting
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [Authorize]
        [HttpPost]
        public async Task<ActionResult<UFO_sighting>> PostUFO_sighting(UFO_sighting uFO_sighting)
        {
            _context.UFO_sighting.Add(uFO_sighting);
            await _context.SaveChangesAsync();

            return StatusCode(201);
        }

        // DELETE: api/UFO_sighting/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUFO_sighting(int id)
        {
            var uFO_sighting = await _context.UFO_sighting.FindAsync(id);
            if (uFO_sighting == null)
            {
                return NotFound();
            }

            _context.UFO_sighting.Remove(uFO_sighting);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UFO_sightingExists(int id)
        {
            return _context.UFO_sighting.Any(e => e.ID == id);
        }
    }
}
