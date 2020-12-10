using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;

namespace _2020.Days
{
    public class Day10 : BaseDay
    {
        public Day10() : base(10) { }

        public override string PartOne(string input)
        {
            var adapters = input
                .Split("\n")
                .Select(int.Parse)
                .OrderBy(x => x)
                .ToArray();

            var oneDiff = 0;
            var threeDiff = 1; // device built in is always 3 higher than highest adapter
            var previous = 0;

            foreach (var adapter in adapters)
            {
                if (adapter - previous == 1)
                    oneDiff++;
                else if (adapter - previous == 3)
                    threeDiff++;

                previous = adapter;
            }

            return (oneDiff * threeDiff).ToString();
        }

        public override string PartTwo(string input)
        {
            var adapters = input
                .Split("\n")
                .Select(int.Parse)
                .OrderBy(x => x)
                .ToArray();

            var adapterList = new List<int>{0};
            adapterList.AddRange(adapters);
            adapters = adapterList.ToArray();

            var arrangements = CountArrangements(adapters, 0, new Dictionary<int, long>());

            return arrangements.ToString();
        }

        private static long CountArrangements(int[] adapters, int adapterIndex, IDictionary<int, long> adapterPathMemory)
        {
            if (adapterIndex == adapters.Length - 1)
                return 1;

            var currentAdapterJoltage = adapters[adapterIndex];

            long arrangements = 0;
            for (var i = adapterIndex + 1; i <= adapterIndex + 3 && i < adapters.Length; i++)
            {
                var adapterJoltageDifference = adapters[i] - currentAdapterJoltage;

                if (adapterJoltageDifference > 0 && adapterJoltageDifference <= 3)
                {
                    if (adapterPathMemory.TryGetValue(i, out var storedArrangements))
                    {
                        arrangements += storedArrangements;
                    }
                    else
                    {
                        var foundArrangements = CountArrangements(adapters, i, adapterPathMemory);
                        adapterPathMemory[i] = foundArrangements;
                        arrangements += foundArrangements;
                    }
                }
            }

            return arrangements;
        }
    }
}
