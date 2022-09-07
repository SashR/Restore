using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.RequestHelpers
{
    public class MetaData
    {
        // info to be returned to client to be displayed
        public int CurrentPage { get; set; }
        public int TotalPages { get; set; }
        public int PageSize { get; set; }   
        public int TotalCount { get; set; } // items count
    }
}