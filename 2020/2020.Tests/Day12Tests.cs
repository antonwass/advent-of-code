using _2020.Days;
using Xunit;

namespace _2020.Tests
{
    public class Day12Tests
    {
        private readonly string _example1 = @"F10
N3
F7
R90
F11".Replace("\r", "");

        [Fact]
        public void Test1()
        {
            var solver = new Day12();

            var result = solver.PartOne(_example1);

            Assert.Equal("25", result);
        }

        [Fact]
        public void Test2()
        {
            var solver = new Day12();

            var result = solver.PartTwo(_example1);

            Assert.Equal("286", result);
        }
    }
}
