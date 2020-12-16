using _2020.Days;
using System.Linq;
using Xunit;

namespace _2020.Tests
{
    public class Day14Tests
    {
        private readonly string _example1 = @"mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X
mem[8] = 11
mem[7] = 101
mem[8] = 0".Replace("\r", "");

        private readonly string _example2 = @"mask = 000000000000000000000000000000X1001X
mem[42] = 100
mask = 00000000000000000000000000000000X0XX
mem[26] = 1".Replace("\r", "");



        [Fact]
        public void Test1()
        {
            var solver = new Day14();

            var result = solver.PartOne(_example1);

            Assert.Equal("165", result);
        }

        [Fact]
        public void Test2()
        {
            var solver = new Day14();

            var result = solver.PartTwo(_example2);

            Assert.Equal("208", result);
        }
    }
}
