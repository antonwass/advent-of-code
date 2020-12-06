using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _2020.Days
{
    public class Day06 : BaseDay
    {
        public Day06() : base(6) { }

        public override string PartOne(string input)
        {
            var split = input.Split("\n");

            var groups = split.Aggregate(new List<string>() { "" }, (acc, next) =>
              {
                  if (next == "")
                  {
                      acc.Add("");
                      return acc;
                  }
                  else
                  {
                      var last = acc.Last();
                      last += next;
                      acc[acc.Count - 1] = last;
                      return acc;
                  }
              });

            var unique = groups.Select(x => string.Join("", x.Distinct())).ToArray();

            var sum = unique.Sum(x => x.Length);

            return sum.ToString();
        }



        public override string PartTwo(string input)
        {
            var split = input.Split("\n");

            var groups = split.Aggregate(new List<string>() { "" }, (acc, next) =>
            {
                if (next == "")
                {
                    acc.Add("");
                    return acc;
                }
                else
                {
                    acc[^1] = acc.Last() + ":" + next;
                    return acc;
                }
            });

            groups = groups.Select(x => x.TrimStart(':')).ToList();

            var unique = groups
                .Select(x => x.Replace(":", ""))
                .Select(x => string.Join("", x.Distinct()))
                .ToArray();

            var all = unique
                .Select((x, i) => new { Unique = x, Group = groups[i].Split(":") })
                .Select(x => x.Unique.Where(u => x.Group.All(g => g.Contains(u))))
                .Select(x => x.Count());

            return all.Sum().ToString();
        }
    }
}
