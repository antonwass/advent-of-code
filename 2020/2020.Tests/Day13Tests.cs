using _2020.Days;
using System.Linq;
using Xunit;

namespace _2020.Tests
{
    public class Day13Tests
    {
        private readonly string _example1 = @"939
7,13,x,x,59,x,31,19".Replace("\r", "");

        private readonly string[] _exampleList = new[]
        {
            "\n17,x,13,19",
            "\n67,7,59,61",
            "\n67,x,7,59,61",
            "\n67,7,x,59,61",
            "\n1789,37,47,1889",
        };

        [Fact]
        public void Test1()
        {
            var solver = new Day13();

            var result = solver.PartOne(_example1);

            Assert.Equal("295", result);
        }

        [Fact]
        public void Test2()
        {
            var solver = new Day13();


            var results = _exampleList.Select(solver.PartTwo).ToArray();

            var expectedResults = new[]
            {
                "3417",
                "754018",
                "779210",
                "1261476",
                "1202161486"
            };

            Assert.Equal(expectedResults[0], results[0]);
            Assert.Equal(expectedResults[1], results[1]);
            Assert.Equal(expectedResults[2], results[2]);
            Assert.Equal(expectedResults[3], results[3]);
            Assert.Equal(expectedResults[4], results[4]);
        }
    }
}
