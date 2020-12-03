using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using _2020.Inputs;

namespace _2020.Days
{
    public abstract class BaseDay
    {
        private readonly string _id;

        protected BaseDay(string dayId)
        {
            _id = dayId;
        }

        public void PrintResults(IDictionary<string, Input> inputs)
        {
            var input = inputs[_id];

            Console.WriteLine($"Day {_id}");
            Console.WriteLine($"\t{PartOne(input.PartOne)}");
            Console.WriteLine($"\t{PartTwo(input.PartTwo ?? input.PartOne)}");
        }

        public abstract string PartOne(string input);

        public abstract string PartTwo(string input);
    }
}
