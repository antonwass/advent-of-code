using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _2020.Days
{
    public class Day04 : BaseDay
    {
        public Day04() : base(4)
        {
        }

        public override string PartOne(string input)
        {
            var passports = ParsePassports(input);

            return passports.Count(ValidatePassport).ToString();
        }

        private bool ValidatePassport(string passport)
        {
            var requiredFields = new[]
            {
                "byr",
                "iyr",
                "eyr",
                "hgt",
                "hcl",
                "ecl",
                "pid",
                "cid"
            };

            var fields = passport.Split(" ")
                .Select(x => x.Split(":")[0]);

            var missingFields = requiredFields.Where(x => fields.Contains(x) == false).ToArray();

            if (missingFields.Length == 1 && missingFields.Single() == "cid")
                return true;

            return missingFields.Length == 0;
        }

        private static string[] ParsePassports(string raw)
        {
            var rows = raw
                .Split("\n");


            var passports = new List<string>();
            var passport = "";

            foreach (var row in rows)
            {
                if (string.IsNullOrEmpty(row))
                {
                    passports.Add(passport.TrimEnd());
                    passport = "";
                }
                else
                {
                    passport += $"{row} ";
                }
            }
            passports.Add(passport.TrimEnd());

            return passports.ToArray();
        }

        public override string PartTwo(string input)
        {
            var passports = ParsePassports(input);

            return passports.Count(ValidatePassportWithValues).ToString();
        }

        private bool ValidatePassportWithValues(string passport)
        {
            var requiredFields = new[]
            {
                "byr",
                "iyr",
                "eyr",
                "hgt",
                "hcl",
                "ecl",
                "pid"
            };

            var fields = passport.Split(" ");

            var missingFields = requiredFields
                .Where(x => fields.Select(f => f.Split(":")[0]).Contains(x) == false)
                .ToArray();

            //if (missingFields.Length == 1 && missingFields.Single().Split(":")[0] == "cid")
            //    return true;

            return missingFields.Length == 0 && fields.All(ValidateField);
        }

        private bool ValidateField(string fieldPair)
        {
            var split = fieldPair.Split(":");
            var key = split[0];
            var value = split[1];

            var result = key switch
            {
                "byr" => ValidateByr(value),
                "iyr" => ValidateIyr(value),
                "eyr" => ValidateEyr(value),
                "hgt" => ValidateHgt(value),
                "hcl" => ValidateHcl(value),
                "ecl" => ValidateEcl(value),
                "pid" => ValidatePid(value),
                "cid" => true,
                _ => throw new Exception("Unknown field")
            };

            return result;
        }

        private bool ValidateByr(string value)
        {
            if (!int.TryParse(value, out var parsed))
                return false;

            return value.Length == 4 && parsed >= 1920 && parsed <= 2002;
        }

        private bool ValidateIyr(string value)
        {
            if (!int.TryParse(value, out var parsed))
                return false;

            return value.Length == 4 && parsed >= 2010 && parsed <= 2020;
        }

        private bool ValidateEyr(string value)
        {
            if (!int.TryParse(value, out var parsed))
                return false;

            return value.Length == 4 && parsed >= 2020 && parsed <= 2030;
        }

        private bool ValidateHgt(string value)
        {
            var mType = value.Substring(value.Length-2);
            var mValue = value.Substring(0, value.Length-2);
            if (!int.TryParse(mValue, out var parsed))
                return false;

            return mType switch
            {
                "cm" => parsed >= 150 && parsed <= 193,
                "in" => parsed >= 59 && parsed <= 76,
                _ => false
            };
        }

        private bool ValidateHcl(string value)
        {
            if (value[0] != '#')
                return false;

            var color = value.Substring(1);

            if (color.Length != 6)
                return false;

            return color.All(x => "0123456789".Contains(x) || "abcdef".Contains(x));
        }

        private bool ValidateEcl(string value)
        {
            var requiredColors = new[]
            {
                "amb", "blu", "brn", "gry", "grn", "hzl", "oth"
            };

            return requiredColors.Contains(value);
        }

        private bool ValidatePid(string value)
        {
            return value.Length == 9 && int.TryParse(value, out _);
        }
    }
}
