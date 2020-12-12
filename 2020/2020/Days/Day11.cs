using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using _2020.Extensions;

namespace _2020.Days
{
    public class Day11 : BaseDay
    {
        public Day11() : base(11) { }

        public override string PartOne(string input)
        {
            var seatLayout = input.To2DArray();
            var nextSeatLayout = input.To2DArray();

            do
            {
                CopyLayout(nextSeatLayout, seatLayout);

                for (var x = 0; x < seatLayout.GetLength(0); x++)
                {
                    for (var y = 0; y < seatLayout.GetLength(1); y++)
                    {
                        nextSeatLayout[x, y] = NextState(seatLayout, x, y);
                    }
                }
            }
            while (CompareLayout(seatLayout, nextSeatLayout) == false);

            return GridToCharArray(seatLayout).Count(x => x == '#').ToString();
        }

        private static void PrintGrid(char[,] grid)
        {
            for (int i = 0; i < grid.GetLength(0); i++)
            {
                for (var j = 0; j < grid.GetLength(1); j++)
                {
                    Console.Write(grid[i,j]);
                }
                Console.WriteLine();
            }
            Console.WriteLine();
        }

        private static char[] GridToCharArray(char[,] grid)
        {
            var list = new List<char>();
            for (int i = 0; i < grid.GetLength(0); i++)
            {
                for (var j = 0; j < grid.GetLength(1); j++)
                {
                    list.Add(grid[i, j]);
                }
            }

            return list.ToArray();
        }

        private static char NextState(char[,] layout, int x, int y)
        {
            var seat = layout[x, y];
            var adjacentSeats = GetAdjacentSeats(layout, x, y);

            return seat switch
            {
                'L' when adjacentSeats.Any(adjSeat => adjSeat == '#') == false => '#',
                '#' when adjacentSeats.Count(adjSeat => adjSeat == '#') >= 4 => 'L',
                _ => seat
            };
        }

        private static char[] GetAdjacentSeats(char[,] layout, int x, int y)
        {
            var adjacentPositions = new[]
            {
                new { X = x-1, Y = y-1},
                new { X = x, Y = y-1},
                new { X = x+1, Y = y-1},
                new { X = x-1, Y = y},
                new { X = x+1, Y = y},
                new { X = x-1, Y = y+1},
                new { X = x, Y = y+1},
                new { X = x+1, Y = y+1}
            };

            var filteredPositions = adjacentPositions.Where(pos =>
                pos.X >= 0
                && pos.Y >= 0
                && pos.X < layout.GetLength(0)
                && pos.Y < layout.GetLength(1));

            var seats = filteredPositions
                .Select(pos => layout[pos.X, pos.Y])
                .ToArray();

            return seats;
        }

        private static void CopyLayout(char[,] source, char[,] target)
        {
            for (int i = 0; i < source.GetLength(0); i++)
            {
                for (int j = 0; j < source.GetLength(1); j++)
                {
                    target[i, j] = source[i, j];
                }
            }
        }

        private static bool CompareLayout(char[,] source, char[,] target)
        {
            for (int i = 0; i < source.GetLength(0); i++)
            {
                for (int j = 0; j < source.GetLength(1); j++)
                {
                    if (target[i, j] != source[i, j])
                    {
                        return false;
                    }
                }
            }
            return true;
        }

        public override string PartTwo(string input)
        {
            var seatLayout = input.To2DArray();
            var nextSeatLayout = input.To2DArray();

            do
            {
                CopyLayout(nextSeatLayout, seatLayout);

                for (var x = 0; x < seatLayout.GetLength(0); x++)
                {
                    for (var y = 0; y < seatLayout.GetLength(1); y++)
                    {
                        nextSeatLayout[x, y] = NextStatePartTwo(seatLayout, x, y);
                    }
                }
            }
            while (CompareLayout(seatLayout, nextSeatLayout) == false);

            return GridToCharArray(seatLayout).Count(x => x == '#').ToString();
        }

        private static char NextStatePartTwo(char[,] layout, int x, int y)
        {
            var seat = layout[x, y];
            var visibleSeats = GetVisibleSeats(layout, x, y);

            return seat switch
            {
                'L' when visibleSeats.Any(adjSeat => adjSeat == '#') == false => '#',
                '#' when visibleSeats.Count(adjSeat => adjSeat == '#') >= 5 => 'L',
                _ => seat
            };
        }

        private static char[] GetVisibleSeats(char[,] layout, int x, int y)
        {
            var visibleSeats = new[]
                {
                    FindFirstSeat(layout, x, y, -1, -1),
                    FindFirstSeat(layout, x, y, 0, -1),
                    FindFirstSeat(layout, x, y, 1, -1),
                    FindFirstSeat(layout, x, y, -1, 0),
                    FindFirstSeat(layout, x, y, 1, 0),
                    FindFirstSeat(layout, x, y, -1, 1),
                    FindFirstSeat(layout, x, y, 0, 1),
                    FindFirstSeat(layout, x, y, 1, 1),
                }
                .Where(seat => seat != null)
                .Cast<char>()
                .ToArray();


            return visibleSeats;
        }

        private static char? FindFirstSeat(char[,] layout, int x, int y, int dx, int dy)
        {
            x += dx;
            y += dy;

            while (x >= 0 && x < layout.GetLength(0) && y >= 0 && y < layout.GetLength(1))
            {
                if ("#L".Contains(layout[x, y]))
                {
                    return layout[x, y];
                }

                x += dx;
                y += dy;
            }

            return null;
        }
    }
}
