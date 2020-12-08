using _2020.Days;
using Xunit;

namespace _2020.Tests
{
    public class Day06Tests
    {
        private readonly string _example1 = @"abc

a
b
c

ab
ac

a
a
a
a

b".Replace("\r", "");

        [Fact]
        public void Test1()
        {
            var solver = new Day06();

            var result = solver.PartOne(_example1);

            Assert.Equal("11", result);
        }

        [Fact]
        public void Test2()
        {
            var solver = new Day06();

            var result = solver.PartTwo(_example1);

            Assert.Equal("6", result);
        }
    }
}
