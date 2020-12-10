using _2020.Days;
using Xunit;

namespace _2020.Tests
{
    public class Day09Tests
    {
        private readonly string _example1 = @"35
20
15
25
47
40
62
55
65
95
102
117
150
182
127
219
299
277
309
576".Replace("\r", "");

        [Fact]
        public void Test1()
        {
            var solver = new Day09(5);

            var result = solver.PartOne(_example1);

            Assert.Equal("127", result);
        }

        [Fact]
        public void Test2()
        {
            var solver = new Day09(5);

            var result = solver.PartTwo(_example1);

            Assert.Equal("62", result);
        }
    }
}
