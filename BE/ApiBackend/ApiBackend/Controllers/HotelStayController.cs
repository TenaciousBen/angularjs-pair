using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace ApiBackend.Controllers
{
    public class HotelStayController : CachedRestController<HotelStay>
    {
        private static List<HotelStay> _defaultHotelStays = new List<HotelStay>
        {
            new HotelStay(1, 1, 2, DateTime.Parse("2012-08-08"), DateTime.Parse("2012-08-09")),
            new HotelStay(2, 1, 3, DateTime.Parse("2012-08-09"), DateTime.Parse("2012-08-10")),
            new HotelStay(3, 2, 1, DateTime.Parse("2012-08-05"), DateTime.Parse("2012-08-10")),
            new HotelStay(4, 3, 4, DateTime.Parse("2012-08-09"), DateTime.Parse("2012-09-09"))
        };

        public HotelStayController() : base(nameof(HotelStayController), _defaultHotelStays)
        {
        }
    }

    public class HotelStay : ApiModel
    {
        public int PersonId { get; set; }
        public int HotelId { get; set; }
        public DateTime CheckIn { get; set; }
        public DateTime CheckOut { get; set; }

        public HotelStay(int id, int personId, int hotelId, DateTime checkIn, DateTime checkOut) : base(id)
        {
            PersonId = personId;
            HotelId = hotelId;
            CheckIn = checkIn;
            CheckOut = checkOut;
        }
    }
}