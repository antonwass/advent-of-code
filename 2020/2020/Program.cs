using System;
using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using _2020.Days;
using _2020.Inputs;

namespace _2020
{
    class Program
    {
        static async Task Main(string[] args)
        {
            var inputs = await InputLoader.LoadAsync(2020);
            new Day01().PrintResults(inputs);
            new Day02().PrintResults(inputs);
            new Day03().PrintResults(inputs);
            new Day04().PrintResults(inputs);
            new Day05().PrintResults(inputs);
            // Add more days here
        }

    }
}
