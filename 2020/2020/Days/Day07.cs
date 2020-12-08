using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;

namespace _2020.Days
{
    public class Day07 : BaseDay
    {
        public Day07() : base(7) { }

        private class Bag
        {
            public string Id { get; set; }
            public IList<BagContainment> Containments { get; set; } = new List<BagContainment>();
        }

        private class BagContainment
        {
            public Bag Bag { get; set; }
            public int Amount { get; set; }
        }

        public override string PartOne(string input)
        {
            var rules = input.Split("\n");
            var bags = ParseBags(rules);

            var hits = 0;

            foreach (var bag in bags)
            {
                if (FindBagContainments(bag.Value, "shiny gold"))
                    hits++;
            }

            return hits.ToString();
        }

        private IDictionary<string, Bag> ParseBags(string[] rules)
        {
            var bags = new Dictionary<string, Bag>();

            foreach (var rule in rules)
            {
                var bagId = string.Join(" ", rule.Split(" ").Take(2));

                var bag = GetOrCreateBag(bags, bagId);


                var containments = string.Join(" ", rule.Split(" ").Skip(4))
                    .Split(",")
                    .Select(x => x.TrimStart(' '))
                    .ToArray();

                foreach (var containment in containments)
                {
                    if (containment == "no other bags.")
                        continue;

                    var containmentSplit = containment.Split(" ");

                    var containmentAmount = int.Parse(containmentSplit[0]);
                    var containmentBagId = string.Join(" ", containmentSplit.Skip(1).Take(2));

                    var containmentBag = GetOrCreateBag(bags, containmentBagId);

                    bag.Containments.Add(new BagContainment
                    {
                        Amount = containmentAmount,
                        Bag = containmentBag
                    });
                }
            }

            return bags;
        }

        private Bag GetOrCreateBag(IDictionary<string, Bag> bags, string bagId)
        {
            if (!bags.TryGetValue(bagId, out var bag))
            {
                bag = new Bag { Id = bagId };
                bags[bag.Id] = bag;
            }

            return bag;
        }


        private bool FindBagContainments(Bag bag, string id)
        {
            if (bag.Containments.Any() == false)
                return false;

            foreach (var containment in bag.Containments)
            {
                if (containment.Bag.Id == id || FindBagContainments(containment.Bag, id))
                    return true;
            }

            return false;
        }

        public override string PartTwo(string input)
        {
            var bags = ParseBags(input.Split("\n"));

            var shinyBag = bags.First(x => x.Key == "shiny gold").Value;

            var containments = CountContainments(shinyBag);

            return containments.ToString();
        }

        private int CountContainments(Bag bag)
        {
            if (bag.Containments.Any() == false)
                return 0;

            var nestedBagCount = 0;

            foreach (var containment in bag.Containments)
            {
                nestedBagCount += containment.Amount + containment.Amount * CountContainments(containment.Bag);
            }

            return nestedBagCount;
        }
    }
}
