using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class BasketController : BaseApiController
    {
        private readonly StoreContext _context;

        public BasketController(StoreContext context)
        {
            _context = context;
        }

        // Endpoint for fetching a basket
        [HttpGet]
        public async Task<ActionResult<Basket>> GetBasket()
        {
            var basket = await _context.Baskets             // Fetch basket
                .Include(i => i.Items)                      // Include the items in the basket
                .ThenInclude(p => p.Product)                // map the items to products
                .FirstOrDefaultAsync(x => x.BuyerId == Request.Cookies["buyerId"]); // use cookie to find it

            if(basket == null) return NotFound();
            return basket;
        }

        // Endpoint for adding an item to a basket
        [HttpPost]
        public async Task<ActionResult> AddItemToBasket(int productId, int quantity)
        {
            // Find basket if it exists
            // Create basket if it doesn't
            // FInd product using productId
            // Add item with quantity
            // Save changes
            return StatusCode(201);
        }

        // Endpoint for removing an item from the basket
        [HttpDelete]
        public async Task<ActionResult> RebmoveItemFromBasket(int productId, int quantity)
        {
            // Get basket
            // remove item or reduce quantity
            // save changes
            return Ok();
        }

    }
}