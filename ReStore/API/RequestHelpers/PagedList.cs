using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace API.RequestHelpers
{
    // The T allows PagedList to be used with any types of entities
    // PagedList of type T extends List of type T
    public class PagedList<T> : List<T>
    {
        // Constructor -> set default metadata
        public PagedList(List<T> items, int count, int pageNumber, int pageSize)
        {
            MetaData = new MetaData()
            {
                TotalCount = count,
                PageSize = pageSize,
                CurrentPage = pageNumber,
                TotalPages = (int)Math.Ceiling(count/(double)pageSize)
            };
            AddRange(items);
        }

        public MetaData MetaData {get; set;}


        public static async Task<PagedList<T>> ToPagedList(IQueryable<T> query, int pageNumber, int pageSize)
        {
            // Executed against database to get total count of items available
            var count = await query.CountAsync(); 

            // Now we need to fetch items accord to pagination rules
            var items = await query
                .Skip((pageNumber-1)*pageSize)  // Skips starting amount of items
                .Take(pageSize)                 // Takes pageSize amount of items
                .ToListAsync();                 // Execute against db
            
            // Now to combine metadata with list
            return new PagedList<T>(items, count, pageNumber, pageSize);

        } 
    }
}