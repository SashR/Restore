using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.RequestHelpers
{
    public class PaginationParams
    {
        private const int MaxPageSize = 50; // maximum products to be loaded
        public int PageNumber {get; set;} = 1; // default page number set to 1
        private int _pageSize = 6;
        public int pageSize
        {
            get => _pageSize;
            set => _pageSize = value > MaxPageSize ? MaxPageSize : value;
        }
        // Equation for products to be loaded => (PageNumber-1)*pageSize to PageNumber*pageSize - 1
    }
}