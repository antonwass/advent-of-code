using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using _2020.Extensions;

namespace _2020.Days
{
    public class Day03 : BaseDay
    {
        public Day03() : base("03")
        {
        }

        public enum Dimensions
        {
            X = 0,
            Y = 1
        }

        public override string PartOne(string input)
        {
            var pattern = input.To2DArray();

            return Traverse(pattern, 3, 1).ToString();
        }

        private static long Traverse(char[,] pattern, int xIncrement, int yIncrement)
        {
            var position = new { X = 0, Y = 0 };
            long trees = 0;

            while (position.Y < pattern.GetLength((int)Dimensions.Y))
            {
                if (pattern[position.X % pattern.GetLength((int)Dimensions.X), position.Y] == '#')
                    trees++;

                position = new { X = position.X + xIncrement, Y = position.Y + yIncrement };
            }

            return trees;
        }

        public override string PartTwo(string input)
        {
            var pattern = input.To2DArray();
            return (
                Traverse(pattern, 1, 1) *
                Traverse(pattern, 3, 1) *
                Traverse(pattern, 5, 1) *
                Traverse(pattern, 7, 1) *
                Traverse(pattern, 1, 2)
                ).ToString();
        }
    }
}
