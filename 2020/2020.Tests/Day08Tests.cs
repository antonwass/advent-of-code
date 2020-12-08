using _2020.Days;
using Xunit;

namespace _2020.Tests
{
    public class Day08Tests
    {
        private readonly string _example1 = @"nop +0
acc +1
jmp +4
acc +3
jmp -3
acc -99
acc +1
jmp -4
acc +6".Replace("\r", "");

        [Fact]
        public void Test1()
        {
            var solver = new Day08();

            var result = solver.PartOne(_example1);

            Assert.Equal("5", result);
        }

        [Fact]
        public void Test2()
        {
            var solver = new Day08();

            var result = solver.PartTwo(_example1);

            Assert.Equal("8", result);
        }
    }
}
