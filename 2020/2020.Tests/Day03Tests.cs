using _2020.Days;
using Xunit;

namespace _2020.Tests
{
    public class Day03Tests
    {
        private readonly string _example1 = @"..##.......
#...#...#..
.#....#..#.
..#.#...#.#
.#...##..#.
..#.##.....
.#.#.#....#
.#........#
#.##...#...
#...##....#
.#..#...#.#".Replace("\r", "");

        [Fact]
        public void Test1()
        {
            var solver = new Day03();

            var result = solver.PartOne(_example1);

            Assert.Equal("7", result);
        }

        [Fact]
        public void Test2()
        {
            var solver = new Day03();

            var result = solver.PartTwo(_example1);

            Assert.Equal("336", result);
        }
    }
}
