using System.Collections.Generic;

namespace ApiBackend.Controllers
{
    public class HotelController : CachedRestController<Hotel>
    {
        private static List<Hotel> _defaultHotels = new List<Hotel>
        {
            new Hotel(1, "Motel", "London", 20m),
            new Hotel(2, "Average Inn", "Paris", 37.5m),
            new Hotel(3, "Everyday Stay", "London", 42.5m),
            new Hotel(4, "Luxury Place", "Berlin", 100m)
        };

        public HotelController() : base(nameof(HotelController), _defaultHotels)
        {
        }
    }

    public class Hotel : ApiModel
    {
        public string Name { get; set; }
        public string City { get; set; }
        public decimal PricePerNight { get; set; }

        public Hotel(int? id, string name, string city, decimal pricePerNight) : base(id)
        {
            Name = name;
            City = city;
            PricePerNight = pricePerNight;
        }

        /// <summary>
        /// Default constructor for the Web API model binder
        /// </summary>
        public Hotel()
        {
        }
    }
}