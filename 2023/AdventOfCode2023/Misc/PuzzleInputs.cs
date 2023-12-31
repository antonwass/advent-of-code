using AdventOfCode2023.Misc;

internal class PuzzleInputs(string sessionCookie)
{
    public async Task<string> GetInput(int day)
    {
        var client = new HttpClient();

        client.BaseAddress = new Uri("https://adventofcode.com");
        client.DefaultRequestHeaders.Add("Cookie", sessionCookie);

        var result = await client.GetStringAsync($"/2023/day/{day}/input");

        return result;
    }
}
