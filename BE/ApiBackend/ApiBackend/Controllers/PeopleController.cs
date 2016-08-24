using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace ApiBackend.Controllers
{
    public class PeopleController : CachedRestController<Person>
    {
        private static List<Person> _defaultPeople = new List<Person>
        {
            new Person(1, "Ben", 26, 100m),
            new Person(2, "Usman", 22, 120m),
            new Person(3, "Robert", 23, 150m),
            new Person(4, "Hans", 41, 200m)
        };

        public PeopleController() : base(nameof(PeopleController), _defaultPeople)
        {
        }
    }

    public class Person : ApiModel
    {
        public string Name { get; set; }
        public int Age { get; set; }
        public decimal Budget { get; set; }

        public Person(int id, string name, int age, decimal budget) : base(id)
        {
            Name = name;
            Age = age;
            Budget = budget;
        }
    }
}