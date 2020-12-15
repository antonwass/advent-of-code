using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;

namespace _2020.Days
{
    public class Day13 : BaseDay
    {
        public Day13() : base(13) { }

        public override string PartOne(string input)
        {
            var split = input.Split("\n");
            var earliestTimestamp = int.Parse(split[0]);
            var buses = split[1]
                .Split(",")
                .Where(x => x != "x")
                .Select(int.Parse)
                .ToArray();

            for (int i = earliestTimestamp; i < earliestTimestamp + buses.Max(); i++)
            {
                foreach (var bus in buses)
                {
                    if (i % bus == 0)
                        return ((i - earliestTimestamp) * bus).ToString();
                }
            }

            return "no solution!";
        }

        public override string PartTwo(string input)
        {
            var split = input.Split("\n");
            var buses = split[1]
                .Split(",")
                .Select(x => x == "x" ? "1" : x)
                .Select(int.Parse)
                .ToArray();

            var busesWithIndex = buses
                .Select((x, i) => new { X = x, Index = i })
                .Where(x => x.X != 1)
                .ToArray();

            long step = 1;
            var toConsiderAmount = 2;
            var toConsider = busesWithIndex.Take(toConsiderAmount).ToArray();

            var solutionFound = false;
            for (long timestamp = 0; true; timestamp += step)
            {
                solutionFound = toConsider
                    .All(x => ((timestamp + x.Index) % x.X) == 0);

                if (solutionFound)
                {
                    if (toConsiderAmount == busesWithIndex.Length)
                        return timestamp.ToString();

                    // Some manual testing (inspecting more than the first solution for two bus IDs) showed that the pattern with departures 
                    // repeats itself every x timestamp x showed to be the product of all departures (bus IDs). So I decided to start with the 
                    // first two departures and find the timestamp where they leave x+i from each other (where x is the timestamp and i is the departure index).
                    // When that timestamp is found, I calculate the product of all departures and used that as the step value in the loop.
                    // With above optimization Day13Tests.Test2 went from 150ms to < 15ms, and puzzle input took 1ms to solve.

                    step = toConsider.Aggregate((long)1, (x, y) => x *= y.X);
                    toConsider = busesWithIndex.Take(++toConsiderAmount).ToArray();
                }
            }
        }
    }
}
