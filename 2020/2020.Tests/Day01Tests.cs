using System;
using _2020.Challenges;
using Xunit;

namespace _2020.Tests
{
    public class Day01Tests
    {
        private readonly string _example1 = @"
1721
979
366
299
675";
        [Fact]
        public void Test1()
        {
            var solver = new Day01();
            var result = solver.PartOne(_example1);

            Assert.Equal("514579", result);
        }

        [Fact]
        public void Test2()
        {
            var solver = new Day01();
            var result = solver.PartTwo(_example1);

            Assert.Equal("241861950", result);
        }
    }
}
