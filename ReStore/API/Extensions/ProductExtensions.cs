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

        public static IQueryable<Product> Filter(this IQueryable<Product> query, string brands, string types)
        {
            // temp variables creation
            var brandList = new List<string>();
            var typeList = new List<string>();

            // Populating Lists
            if(!string.IsNullOrEmpty(brands)) brandList.AddRange(brands.ToLower().Split(",").ToList());
            if(!string.IsNullOrEmpty(types)) typeList.AddRange(types.ToLower().Split(",").ToList());

            // Filtering based on lists
            query = brandList.Count == 0    ? query : query.Where(p => brandList.Contains(p.Brand.ToLower()));
            query = typeList.Count == 0     ? query : query.Where(p => typeList.Contains(p.Type.ToLower()));

            return query;
        }
    }
}