using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using _2020.Days;
using Xunit;

namespace _2020.Tests
{
    public class Day05Tests
    {
        private readonly string _example1 = "FBFBBFFRLR\nBFFFBBFRRR\nFFFBBBFRRR\nBBFFBBFRLL";

        [Fact]
        public void Test1()
        {
            var solver = new Day05();

            var result = solver.PartOne(_example1);

            Assert.Equal("820", result);
        }
    }
}
