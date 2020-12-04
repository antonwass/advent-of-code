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
        private readonly int _id;

        protected BaseDay(int dayId)
        {
            _id = dayId;
        }

        public void PrintResults(IDictionary<int, string> inputs)
        {
            var input = inputs[_id];

            Console.WriteLine($"Day {_id}");
            Console.WriteLine($"\t{PartOne(input)}");
            Console.WriteLine($"\t{PartTwo(input)}");
        }

        public abstract string PartOne(string input);

        public abstract string PartTwo(string input);
    }
}
