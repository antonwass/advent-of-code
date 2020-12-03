﻿using System;
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
            var inputs = await InputLoader.LoadAsync();
            new Day01().PrintResults(inputs);
            new Day02().PrintResults(inputs);
            // Add more days here
        }

    }
}
