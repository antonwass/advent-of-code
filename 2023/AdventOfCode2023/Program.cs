using AdventOfCode2023.Misc;
using AdventOfCode2023.Solutions;
using System.Text.Json;

var reader = new StreamReader("config.json");
var config = await JsonSerializer.DeserializeAsync<Configuration>(reader.BaseStream);
if (config == null || config.Session == null)
    throw new Exception("Add a file config.json for configuration values.");

var inputs = new PuzzleInputs(config.Session);

await new Day01(inputs).Solve();
await new Day02(inputs).Solve();
await new Day03(inputs).Solve();
// Add more days...