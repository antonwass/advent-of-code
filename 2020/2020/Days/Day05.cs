using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _2020.Days
{
    public class Day05 : BaseDay
    {
        public Day05() : base(5) { }

        public override string PartOne(string input)
        {
            var ids = input
                .Split("\n")
                .Select(ParseSeatCode)
                .ToArray();

            return ids.Max().ToString();
        }

        private int ParseSeatCode(string seatCode)
        {
            var minRow = 0;
            var maxRow = 127;
            var minCol = 0;
            var maxCol = 7;

            while (seatCode.Length > 0)
            {
                var next = seatCode[0];

                switch (next)
                {
                    case 'B':
                        minRow += MidValue(maxRow, minRow) + 1;
                        break;
                    case 'F':
                        maxRow -= MidValue(maxRow, minRow) + 1;
                        break;
                    case 'L':
                        maxCol -= MidValue(maxCol, minCol) + 1;
                        break;
                    case 'R':
                        minCol += MidValue(maxCol, minCol) + 1;
                        break;
                }

                seatCode = seatCode.Substring(1);
            }

            return (maxRow * 8) + maxCol;
        }

        private static int MidValue(int a, int b) => (a - b) / 2;

        public override string PartTwo(string input)
        {
            var ids = input
                .Split("\n")
                .Select(ParseSeatCode)
                .ToArray();

            var sorted = ids.OrderBy(x => x).ToArray();

            return (sorted
                .Select((x, i) => new { Value = x, Next = sorted[i + 1] })
                .First(x => x.Next == x.Value + 2).Value + 1).ToString();
        }
    }
}
