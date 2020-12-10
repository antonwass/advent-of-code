using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;

namespace _2020.Days
{
    public class Day09 : BaseDay
    {
        private readonly int _preamble;

        public Day09(int preamble) : base(9)
        {
            _preamble = preamble;
        }

        public override string PartOne(string input)
        {
            var numbers = input.Split("\n").Select(long.Parse).ToArray();

            for (var i = _preamble; i < numbers.Length; i++)
            {
                if (!IsValid(i, numbers, _preamble))
                {
                    return numbers[i].ToString();
                }
            }

            return "no solution";
        }

        private static bool IsValid(int index, long[] numbers, int preamble)
        {
            var start = index - preamble;
            var end = index;
            var numberToValidate = numbers[index];

            for (var i = start; i < end; i++)
            {
                for (var j = start; j < end; j++)
                {
                    if (i == j)
                        continue;

                    if (numbers[i] + numbers[j] == numberToValidate)
                        return true;
                }
            }

            return false;
        }

        public override string PartTwo(string input)
        {
            var numbers = input.Split("\n").Select(long.Parse).ToArray();

            var invalidNumber = int.Parse(PartOne(input));

            for (var i = 0; i < numbers.Length; i++)
            {
                var sum = numbers[i];
                for (var j = i + 1; sum < invalidNumber; j++)
                {
                    sum += numbers[j];

                    if (sum == invalidNumber)
                    {
                        var orderedSet = numbers.Skip(i).Take(j - i + 1).OrderBy(x => x).ToArray();

                        return (orderedSet.Min() + orderedSet.Max()).ToString();
                    }
                }
            }

            return "no solution";
        }
    }
}
