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

        public static IQueryable<Product> Search(this IQueryable<Product> query, string searchString)
        {
            if(string.IsNullOrWhiteSpace(searchString)) return query;
            return query.Where(p => p.Name.ToLower().Contains(searchString.Trim().ToLower()));
        }

        public static IQueryable<Product> Filter(this IQueryable<Product> query, string field, string value)
        {
            if(string.IsNullOrWhiteSpace(field) || string.IsNullOrWhiteSpace(value)) return query;  // return if either field is empty
            if(field == "type") return query.Where(p => p.Type == value);   // filter by type
            else if (field == "brand") return query.Where(p => p.Brand == value);   // filter by brand
            else return query;  // return without filtering
        }
    }
}