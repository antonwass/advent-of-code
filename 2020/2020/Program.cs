using System;
using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using _2020.Days;
using _2020.Inputs;

namespace _2020
{
    class Program
    {
        static async Task Main(string[] args)
        {
            var inputs = await InputLoader.LoadAsync();
            SolveDay(new Day01(), "01", inputs);
        }

        static void SolveDay(IDay day, string dayId, IDictionary<string, Input> inputs)
        {
            Console.WriteLine($"Day {dayId}");
            Console.WriteLine($"{day.PartOne(inputs[dayId].PartOne)}");
            Console.WriteLine($"{day.PartTwo(inputs[dayId].PartTwo)}");
        }
    }
}
