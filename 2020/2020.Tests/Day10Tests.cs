using _2020.Days;
using Xunit;

namespace _2020.Tests
{
    public class Day10Tests
    {
        private readonly string _example1 = @"16
10
15
5
1
11
7
19
6
12
4".Replace("\r", "");

        private readonly string _example2 = @"28
33
18
42
31
14
46
20
48
47
24
23
49
45
19
38
39
11
1
32
25
35
8
17
7
9
4
2
34
10
3".Replace("\r", "");

        [Fact]
        public void Test1()
        {
            var solver = new Day10();

            var result = solver.PartOne(_example1);

            Assert.Equal("35", result);
        }

        [Fact]
        public void Test2()
        {
            var solver = new Day10();

            var result = solver.PartTwo(_example2);

            Assert.Equal("19208", result);
        }
    }
}
