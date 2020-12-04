using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.Win32.SafeHandles;

namespace _2020.Inputs
{
    public static class InputLoader
    {
        public static async Task<Dictionary<int, string>> LoadAsync(int year)
        {
            var inputs = new Dictionary<int, string>();

            await DownloadMissingInputsAsync(year);

            foreach (var file in Directory.GetFiles("inputs"))
            {
                var day = int.Parse(Path.GetFileNameWithoutExtension(file));
                inputs[day] = await File.ReadAllTextAsync(file);
            }

            return inputs;
        }

        /// <summary>
        /// Downloads inputs that does not already exist in the inputs folder.
        /// </summary>
        /// <param name="year"></param>
        /// <returns></returns>
        public static async Task DownloadMissingInputsAsync(int year)
        {
            Directory.CreateDirectory("inputs");

            var files = Directory
                .GetFiles("inputs")
                .Select(Path.GetFileNameWithoutExtension)
                .Select(int.Parse);

            var expected = Enumerable.Range(1, DateTime.Now >= DateTime.Parse($"{year}-12-24") ? 24 : DateTime.Now.Day);
            var missing = expected.Where(x => files.Contains(x) == false);

            var config = await ReadConfigurationAsync();

            await Task.WhenAll(missing.Select(x => DownloadInputAsync(2020, x, config.Session)));
        }

        private static async Task DownloadInputAsync(int year, int day, string session)
        {
            using var httpClient = new HttpClient();
            var request = new HttpRequestMessage(HttpMethod.Get, $"https://adventofcode.com/{year}/day/{day}/input");

            request.Headers.Add("Cookie", session);

            var result = await httpClient.SendAsync(request);

            await using var writer = new StreamWriter($"inputs\\{day}.txt");
            var input = await result.Content.ReadAsStringAsync();
            await writer.WriteAsync(input.TrimEnd('\n'));
        }

        private static async Task<Configuration> ReadConfigurationAsync()
        {
            var reader = new StreamReader("config.json");
            return await JsonSerializer.DeserializeAsync<Configuration>(reader.BaseStream);
        }
    }
}
