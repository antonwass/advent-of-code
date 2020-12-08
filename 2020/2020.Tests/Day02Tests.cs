using _2020.Days;
using Xunit;

namespace _2020.Tests
{
    public class Day02Tests
    {
        private readonly string _example1 = @"1-3 a: abcde
1-3 b: cdefg
2-9 c: ccccccccc".Replace("\r", "");

        [Fact]
        public void Test1()
        {
            var solver = new Day02();

            var result = solver.PartOne(_example1);

            Assert.Equal("2", result);
        }
    }
}
