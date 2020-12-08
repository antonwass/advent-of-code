using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;

namespace _2020.Days
{
    public class Day08 : BaseDay
    {
        public Day08() : base(8) { }

        private enum ExitReason
        {
            Loop = 1,
            EndOfProgram = 2
        }

        private class ProgramState
        {
            public ProgramState(int programSize)
            {
               AntiLoop = new bool[programSize];
            }

            public int Pointer { get; set; }
            public int Accumulator { get; set; }
            public bool[] AntiLoop { get; } 
            public ExitReason ExitReason { get; set; }
        }

        public override string PartOne(string input)
        {
            var instructions = input.Split("\n");

            var result = RunProgram(instructions);

            return result.Accumulator.ToString();
        }

        private ProgramState RunProgram(string[] instructions)
        {
            var state = new ProgramState(instructions.Length);

            while (state.Pointer >= 0 && state.Pointer < instructions.Length)
            {
                if (state.AntiLoop[state.Pointer])
                {
                    state.ExitReason = ExitReason.Loop;
                    return state;
                }

                state.AntiLoop[state.Pointer] = true;

                var instruction = instructions[state.Pointer].Split(" ");
                var op = instruction[0];
                var arg = int.Parse(instruction[1]);

                switch (op)
                {
                    case "acc":
                        state.Accumulator += arg;
                        state.Pointer++;
                        break;
                    case "jmp":
                        state.Pointer += arg;
                        break;
                    case "nop":
                        state.Pointer++;
                        break;
                }


            }

            state.ExitReason = ExitReason.EndOfProgram;
            return state;
        }

        public override string PartTwo(string input)
        {
            // brute force
            for (var i = 0; i < input.Split("\n").Length; i++)
            {
                var instructions = input.Split("\n");
                var instruction = instructions[i];

                if (instruction.StartsWith("jmp"))
                    instructions[i] = instruction.Replace("jmp", "nop");
                else if (instruction.StartsWith("nop"))
                    instructions[i] = instruction.Replace("nop", "jmp");
                else 
                    continue;

                var result = RunProgram(instructions);

                if (result.ExitReason == ExitReason.EndOfProgram)
                {
                    return result.Accumulator.ToString();
                }
            }

            return "No solution";
        }
    }
}
