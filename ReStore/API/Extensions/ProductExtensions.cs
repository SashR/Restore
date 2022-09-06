using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Extensions
{
    public static class ProductExtensions // We do not want to create a new instance whenever we want to use a method here
    {
        // All methods will be static
        public static IQueryable<Product> Sort(this IQueryable<Product> query, string orderBy)
        {
            if(string.IsNullOrWhiteSpace(orderBy)) return query.OrderBy(p => p.Name);

            query = orderBy switch
            {
                "price"     => query.OrderBy(p => p.Price),
                "priceDesc" => query.OrderByDescending(p => p.Price),
                _           => query.OrderBy(p => p.Name)
            };

            return query;
        }
    }
}