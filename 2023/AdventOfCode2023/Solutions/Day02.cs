using AdventOfCode2023.Misc;

namespace AdventOfCode2023.Solutions;

internal class Day02(PuzzleInputs inputs) : Day(inputs, 2)
{
    public override string PartOne(string input)
    {
        var lines = input.Split('\n').Where(n => n.Length > 0).ToList();

        var redLimit = 12;
        var greenLimit = 13;
        var blueLimit = 14;

        var sum = 0;

        foreach (var line in lines)
        {
            var gameNumber = int.Parse(line.Split(":")[0].Split(" ")[1]);
            var hands = line.Split(": ")[1].Split("; ").ToArray();

            var isPossible = true;

            foreach (var hand in hands)
            {
                var cubes = hand.Split(", ");

                var maxRed = 0;
                var maxBlue = 0;
                var maxGreen = 0;

                foreach (var cube in cubes)
                {
                    var amount = int.Parse(cube.Split(" ")[0]);
                    var color = cube.Split(" ")[1];

                    if (color == "red")
                    {
                        maxRed = amount > maxRed ? amount : maxRed;
                    }

                    if (color == "green")
                    {
                        maxGreen = amount > maxGreen ? amount : maxGreen;
                    }

                    if (color == "blue")
                    {
                        maxBlue = amount > maxBlue ? amount : maxBlue;
                    }
                }

                if (maxBlue > blueLimit ||
                    maxGreen > greenLimit ||
                    maxRed > redLimit)
                {
                    isPossible = false;
                }
            }

            if (isPossible)
            {
                sum += gameNumber;
            }

        }

        return sum.ToString();
    }

    public override string PartTwo(string input)
    {
        var lines = input.Split('\n').Where(n => n.Length > 0).ToList();

        var sum = 0;

        foreach (var line in lines)
        {
            var gameNumber = int.Parse(line.Split(":")[0].Split(" ")[1]);
            var hands = line.Split(": ")[1].Split("; ").ToArray();

            var maxRed = 0;
            var maxBlue = 0;
            var maxGreen = 0;

            foreach (var hand in hands)
            {
                var cubes = hand.Split(", ");

                foreach (var cube in cubes)
                {
                    var amount = int.Parse(cube.Split(" ")[0]);
                    var color = cube.Split(" ")[1];

                    if (color == "red")
                    {
                        maxRed = amount > maxRed ? amount : maxRed;
                    }

                    if (color == "green")
                    {
                        maxGreen = amount > maxGreen ? amount : maxGreen;
                    }

                    if (color == "blue")
                    {
                        maxBlue = amount > maxBlue ? amount : maxBlue;
                    }
                }
            }

            sum += maxRed * maxBlue * maxGreen;
        }

        return sum.ToString();
    }
}
