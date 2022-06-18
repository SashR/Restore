using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class BasketDto
    {
        public int Id {get; set;} // Can be left out

        public string BuyerId {get; set;} // Can also be left out as it can be found in the cookie

        public List<BasktItemDto> Items {get; set;}
    }
}