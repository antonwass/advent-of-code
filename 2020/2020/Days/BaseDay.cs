using System;
using System.Collections.Generic;
using System.Diagnostics;
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
            if (!inputs.TryGetValue(_id, out var input))
            {
                Console.WriteLine($"Day {_id}\n\tMissing input!");
                return;
            }

            var sw = new Stopwatch();

            sw.Start();
            var result1 = PartOne(input);
            var time1 = sw.ElapsedMilliseconds;

            sw.Restart();
            var result2 = PartTwo(input);
            var time2 = sw.ElapsedMilliseconds;
            sw.Stop();

            Console.WriteLine($"Day {_id}");
            Console.WriteLine($"\t{result1} ({time1}ms)");
            Console.WriteLine($"\t{result2} ({time2}ms)");
        }

        public abstract string PartOne(string input);

        public abstract string PartTwo(string input);
    }
}
