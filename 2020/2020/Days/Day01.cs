using System;
using System.Linq;

namespace _2020.Days
{
    public class Day01: IDay
    {
        public string PartOne(string input)
        {
            var list = input
                .Split("\r\n")
                .Select(int.Parse)
                .ToArray();

            for(var i = 0; i < list.Length; i++)
            {
                for (var j = 0; j < list.Length; j++)
                {
                    if (j == i)
                        continue;

                    if (list[i] + list[j] == 2020)
                    {
                        return (list[i] * list[j]).ToString();
                    }
                }
            }

            throw new Exception("No solution found!");
        }

        public string PartTwo(string input)
        {
            var list = input
                .Split("\r\n")
                .Select(int.Parse)
                .ToArray();

            for (var i = 0; i < list.Length; i++)
            {
                for (var j = 0; j < list.Length; j++)
                {
                    if (j == i)
                        continue;

                    for (var k = 0; k < list.Length; k++)
                    {
                        if (j == i || j == k || k == i)
                            continue;

                        if (list[i] + list[j] + list[k] == 2020)
                        {
                            return (list[i] * list[j] * list[k]).ToString();
                        }
                    }
                }
            }

            throw new Exception("No solution found!");
        }
    }
}
