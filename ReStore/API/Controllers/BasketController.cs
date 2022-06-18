using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Http;
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
        public async Task<ActionResult<BasketDto>> GetBasket()
        {
            var basket = await RetrieveBasket();

            if (basket == null) return NotFound();
            return new BasketDto{
                Id = basket.Id,
                BuyerId = basket.BuyerId,
                Items = basket.Items.Select(item => new BasktItemDto
                {
                    ProductId = item.ProductId,
                    Name = item.Product.Name,
                    Price = item.Product.Price,
                    PictureUrl = item.Product.PictureUrl,
                    Type = item.Product.Type,
                    Brand = item.Product.Brand,
                    Quantity = item.Quantity
                }).ToList()
            };
        }

        // Endpoint for adding an item to a basket
        [HttpPost] // values will be fetch from query string: api/basket?productId=32&quntity=2
        public async Task<ActionResult> AddItemToBasket(int productId, int quantity)
        {
            // Find basket if it exists
            var basket = await RetrieveBasket(); // return basket or null (default for any object)
            // Create basket if it doesn't
            if (basket == null) basket = CreateBasket();

            // FInd product using productId
            var product = await _context.Products.FindAsync(productId);
            if (product == null) return NotFound();          // Product does not match, just in case

            // Add item with quantity
            basket.AddItem(product, quantity);
            // Save changes
            var result = await _context.SaveChangesAsync() > 0; // detect if changes occured, commits them

            if (result) return StatusCode(201);

            return BadRequest(new ProblemDetails{Title = "Problem saving item to basket"});
        }

        // Endpoint for removing an item from the basket
        [HttpDelete]
        public async Task<ActionResult> RebmoveItemFromBasket(int productId, int quantity)
        {
            // Get basket
            var basket = await RetrieveBasket(); // return basket or null (default for any object)
            if (basket == null) return NotFound(); // no basket then you can't delete anything

            // remove item or reduce quantity
            basket.RemoveItem(productId, quantity);
            // save changes
            var result = await _context.SaveChangesAsync() > 0; // detect if changes occured, commits them

            if (result) return Ok();

            return BadRequest(new ProblemDetails{Title = "Problem removing item from basket"});
        }

        // Helper method for retrieving a basket
        private async Task<Basket> RetrieveBasket()
        {
            var basket = await _context.Baskets             // Fetch basket
                .Include(i => i.Items)                      // Include the items in the basket
                .ThenInclude(p => p.Product)                // map the items to products
                .FirstOrDefaultAsync(x => x.BuyerId == Request.Cookies["buyerId"]); // use cookie to find it
            return basket;
        }

        // Helper method for creating a basket
        private Basket CreateBasket()
        {
            // create buyer id and cookie
            var buyerId = Guid.NewGuid().ToString(); // Globally Unique Identifier
            var cookieOptions = new CookieOptions{
                IsEssential = true,
                Expires = DateTime.Now.AddDays(30)
            };
            Response.Cookies.Append("buyerId", buyerId, cookieOptions);
            // DO not add HttpOnly flag as it prevent access for JS and TS
            
            var basket = new Basket{BuyerId = buyerId};     // create basket
            _context.Baskets.Add(basket);                   // Add basket to let EF track it
            return basket;
        }

    }
}