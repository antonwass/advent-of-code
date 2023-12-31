namespace AdventOfCode2023.Misc;

internal abstract class Day(PuzzleInputs inputs, int day)
{
    public abstract string PartOne(string input);
    public abstract string PartTwo(string input);

    public async Task Solve()
    {
        Console.WriteLine($"Solving Day {day}");
        var input = await inputs.GetInput(day);

        Console.WriteLine($"Part One: {PartOne(input)}");
        Console.WriteLine($"Part Two: {PartTwo(input)}");
    }
}

