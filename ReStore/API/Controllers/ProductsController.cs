using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using API.Data;
using API.Extensions;

namespace API.Controllers
{
    public class ProductsController : BaseApiController
    {
        private readonly StoreContext _context;
        public ProductsController(StoreContext context)
        {   
            _context = context;
        }

        [HttpGet]               // Returns all products -- api/products
        public async Task<ActionResult<List<Product>>> GetProducts(string orderBy, string searchString)
        {
            var query = _context.Products
                .Sort(orderBy)
                .Search(searchString)
                .AsQueryable();  // Fetches products and allows it to be queried (filtered, etc)

            return await query.ToListAsync(); // Executes built up query against DB and returns result
        }

        [HttpGet("{id}")]       // Pass parameter -- api/products/3
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product ==  null) return NotFound();    // throw not found error
            return product;
        }

    }
}