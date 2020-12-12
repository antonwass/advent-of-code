using _2020.Days;
using Xunit;

namespace _2020.Tests
{
    public class Day11Tests
    {
        private readonly string _example1 = @"L.LL.LL.LL
LLLLLLL.LL
L.L.L..L..
LLLL.LL.LL
L.LL.LL.LL
L.LLLLL.LL
..L.L.....
LLLLLLLLLL
L.LLLLLL.L
L.LLLLL.LL".Replace("\r", "");

        [Fact]
        public void Test1()
        {
            var solver = new Day11();

            var result = solver.PartOne(_example1);

            Assert.Equal("37", result);
        }

        [Fact]
        public void Test2()
        {
            var solver = new Day11();

            var result = solver.PartTwo(_example1);

            Assert.Equal("26", result);
        }
    }
}
