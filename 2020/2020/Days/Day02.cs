using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _2020.Days
{
    public class Day02: BaseDay
    {
        public Day02() : base("02")
        {
        }

        public override string PartOne(string input)
        {
            var validPasswords = input.Split("\r\n")
                .Select(x => x.Split(": "))
                .Select(x => new {Policy = x[0], Password = x[1]})
                .Where(x => CheckPassword(x.Policy, x.Password));

            return validPasswords.Count().ToString();
        }

        private bool CheckPassword(string policy, string password)
        {
            var policySplit = policy.Split(" ");
            var rangeSplit = policySplit[0].Split("-");
            var minRange = int.Parse(rangeSplit[0]);
            var maxRange = int.Parse(rangeSplit[1]);
            var character = policySplit[1][0];

            var matches = password.Count(x => x == character);
            return matches >= minRange && matches <= maxRange;
        }

        public override string PartTwo(string input)
        {
            var validPasswords = input.Split("\r\n")
                .Select(x => x.Split(": "))
                .Select(x => new { Policy = x[0], Password = x[1] })
                .Where(x => CheckPasswordTwo(x.Policy, x.Password));

            return validPasswords.Count().ToString();
        }

        private bool CheckPasswordTwo(string policy, string password)
        {
            var policySplit = policy.Split(" ");
            var rangeSplit = policySplit[0].Split("-");
            var minRange = int.Parse(rangeSplit[0]);
            var maxRange = int.Parse(rangeSplit[1]);
            var character = policySplit[1][0];

            var firstMatch = password[minRange - 1] == character;
            var secondMatch = password[maxRange - 1] == character;

            return firstMatch && !secondMatch || !firstMatch && secondMatch;
        }
    }
}
