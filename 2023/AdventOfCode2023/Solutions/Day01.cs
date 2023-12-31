using AdventOfCode2023.Misc;

namespace AdventOfCode2023.Solutions;

internal class Day01(PuzzleInputs inputs) : Day(inputs, 1)
{
    public override string PartOne(string input)
    {
        var lines = input.Split("\n").Where(l => l.Length > 0);

        var sum = 0;

        foreach (var line in lines)
        {
            var firstNumber = line.First(c => int.TryParse(c.ToString(), out _));
            var lastNumber = line.Last(c => int.TryParse(c.ToString(), out _));

            sum += int.Parse($"{firstNumber}{lastNumber}");
        }

        return sum.ToString();
    }

    public override string PartTwo(string input)
    {
        var lines = input.Split("\n").Where(l => l.Length > 0);

        var numbers = new[] { "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "1", "2", "3", "4", "5", "6", "7", "8", "9" };

        var sum = 0;

        foreach (var line in lines)
        {
            var firstNumber = numbers
                .Where(n => line.IndexOf(n) >= 0)
                .Select(n => new { Number = n, Index = line.IndexOf(n) })
                .MinBy(a => a.Index);

            var lastNumber = numbers
                .Where(n => line.IndexOf(n) >= 0)
                .Select(n => new { Number = n, Index = line.LastIndexOf(n) })
                .MaxBy(a => a.Index);

            sum += int.Parse($"{LetterToInt(firstNumber?.Number)}{LetterToInt(lastNumber?.Number)}");
        }

        return sum.ToString();
    }

    public int LetterToInt(string? letter)
    {
        switch (letter)
        {
            case "one":
            case "1":
                return 1;
            case "two":
            case "2":
                return 2;
            case "three":
            case "3":
                return 3;
            case "four":
            case "4":
                return 4;
            case "five":
            case "5":
                return 5;
            case "six":
            case "6":
                return 6;
            case "seven":
            case "7":
                return 7;
            case "eight":
            case "8":
                return 8;
            case "nine":
            case "9":
                return 9;
            default: throw new Exception("Not a letter");
        }
    }
}

