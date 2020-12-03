using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using _2020.Inputs;

namespace _2020.Days
{
    public interface IDay
    {
        public string PartOne(string input);
        public string PartTwo(string input);
        public void PrintResults(IDictionary<string, Input> inputs);
    }
}
