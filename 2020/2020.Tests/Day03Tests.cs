using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using _2020.Days;
using Xunit;

namespace _2020.Tests
{
    public class Day03Tests
    {
        private readonly string example1 = @"..##.......
#...#...#..
.#....#..#.
..#.#...#.#
.#...##..#.
..#.##.....
.#.#.#....#
.#........#
#.##...#...
#...##....#
.#..#...#.#";

        [Fact]
        public void Test1()
        {
            var solver = new Day03();

            var result = solver.PartOne(example1);

            Assert.Equal("7", result);
        }

        [Fact]
        public void Test2()
        {
            var solver = new Day03();

            var result = solver.PartTwo(example1);

            Assert.Equal("336", result);
        }
    }
}
