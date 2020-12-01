using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _2020.Inputs
{
    public static class InputLoader
    {
        public static async Task<Dictionary<string, Input>> LoadAsync()
        {
            var inputs = new Dictionary<string, Input>();

            foreach(var file in Directory.GetFiles("Inputs/Files"))
            {
                var split = Path.GetFileNameWithoutExtension(file).Split("_");
                var day = split[0];
                var part = split[1];

                if (!inputs.TryGetValue(day, out var input))
                    input = new Input();

                var data = await File.ReadAllTextAsync(file);

                if (part == "1")
                    input.PartOne = data;
                else
                    input.PartTwo = data;

                inputs[day] = input;
            }

            return inputs;
        }
    }
}
