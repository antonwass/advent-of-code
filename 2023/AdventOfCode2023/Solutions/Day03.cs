using AdventOfCode2023.Misc;

namespace AdventOfCode2023.Solutions;

internal class Day03(PuzzleInputs inputs) : Day(inputs, 3)
{
    public override string PartOne(string input)
    {
        var schematic = input.Split("\n").Where(s => s.Length > 0).ToArray().To2DimArray();

        var sum = 0;

        for (var y = 0; y < schematic.GetLength(0); y++)
        {
            var number = "";
            var isPossible = false;

            for (var x = 0; x < schematic.GetLength(1); x++)
            {
                var character = schematic[x, y];

                if (character != '.' && int.TryParse("" + character, out var digit))
                {
                    number += character;
                    if (!isPossible)
                    {
                        if (HasAdjacentSymbol(schematic, x, y))
                        {
                            isPossible = true;
                        }
                    }

                    if (x == schematic.GetLength(0) - 1)
                    {
                        // number on last X
                        if (isPossible)
                        {
                            sum += int.Parse(number);
                        }
                    }
                }
                else if (number.Length > 0)
                {
                    // found full number

                    if (isPossible)
                    {
                        sum += int.Parse(number);
                    }
                    else
                    {

                    }

                    number = "";
                    isPossible = false;
                }
                else
                {
                    // no number, period
                }
            }

            // new line
        }

        return sum.ToString();
    }

    private static bool HasAdjacentSymbol(char[,] schematic, int x, int y)
    {
        if (IsSymbol(schematic, x - 1, y + 1))
            return true;
        if (IsSymbol(schematic, x - 1, y))
            return true;
        if (IsSymbol(schematic, x - 1, y - 1))
            return true;

        if (IsSymbol(schematic, x, y - 1))
            return true;
        if (IsSymbol(schematic, x, y + 1))
            return true;

        if (IsSymbol(schematic, x + 1, y - 1))
            return true;
        if (IsSymbol(schematic, x + 1, y))
            return true;
        if (IsSymbol(schematic, x + 1, y + 1))
            return true;

        return false;
    }

    private static bool IsSymbol(char[,] schematic, int x, int y)
    {
        if (x >= 0 && y < schematic.GetLength(1) && y >= 0 && x < schematic.GetLength(0))
        {
            var c = schematic[x, y];

            if (c != '.' && !"0123456789".Contains(c))
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        return false;
    }

    internal class PossibleGear()
    {
        public int Number { get; set; }
        public (int X, int Y) ? Coordinate { get; set; }
    }

    public override string PartTwo(string input)
    {
        var schematic = input.Split("\n").Where(s => s.Length > 0).ToArray().To2DimArray();

        var possibleGears = new List<PossibleGear>();

        for (var y = 0; y < schematic.GetLength(0); y++)
        {
            var number = "";
            var adjacentGear = default(PossibleGear);

            for (var x = 0; x < schematic.GetLength(1); x++)
            {
                var character = schematic[x, y];

                if (character != '.' && int.TryParse("" + character, out var digit))
                {
                    number += character;
                    if (adjacentGear == null)
                    {
                        var possibleGear = GetAdjacentGear(schematic, x, y);
                        if (possibleGear != null)
                        {
                            adjacentGear = possibleGear;
                        }
                    }

                    if (x == schematic.GetLength(0) - 1)
                    {
                        // finished number
                        if (adjacentGear != null)
                        {
                            adjacentGear.Number = int.Parse(number);
                            possibleGears.Add(adjacentGear);
                        }
                    }
                }
                else if (number.Length > 0)
                {
                    // finished number
                    if (adjacentGear != null)
                    {
                        adjacentGear.Number = int.Parse(number);
                        possibleGears.Add(adjacentGear);
                    }
                    else
                    {

                    }

                    number = "";
                    adjacentGear = null;
                }
                else
                {
                    // no number, period
                }
            }

            // new line
        }

        var lookup = possibleGears
            .ToLookup(x => x.Coordinate)
            .Where(x => x.Count() == 2);

        var product = 0;

        foreach(var gear in lookup)
        {
            var gearArr = gear.ToArray();
            product += gearArr[0].Number * gearArr[1].Number;
        }


        return product.ToString();
    }

    private static PossibleGear? GetAdjacentGear(char[,] schematic, int x, int y)
    {
        PossibleGear? gear;
        if ((gear = IsGear(schematic, x - 1, y + 1)) != null)
            return gear;
        if ((gear = IsGear(schematic, x - 1, y)) != null)
            return gear;
        if ((gear = IsGear(schematic, x - 1, y - 1)) != null)
            return gear;

        if ((gear = IsGear(schematic, x, y - 1)) != null)
            return gear;
        if ((gear = IsGear(schematic, x, y + 1)) != null)
            return gear;

        if ((gear = IsGear(schematic, x + 1, y - 1)) != null)
            return gear;
        if ((gear = IsGear(schematic, x + 1, y)) != null)
            return gear;
        if ((gear = IsGear(schematic, x + 1, y + 1)) != null)
            return gear;

        return null;
    }

    private static PossibleGear? IsGear(char[,] schematic, int x, int y)
    {
        if (x >= 0 && y < schematic.GetLength(1) && y >= 0 && x < schematic.GetLength(0))
        {
            var c = schematic[x, y];

            if (c == '*')
            {
                return new() { Coordinate = new() { X = x - 1, Y = y + 1 } };
            }
            else
            {
                return null;
            }
        }

        return null;
    }
}
