using AdventOfCode2023.Misc;

namespace AdventOfCode2023.Solutions;

internal class Day04(PuzzleInputs inputs) : Day(inputs, 4)
{
    public override string PartOne(string input)
    {
        //        input = @"Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
//Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
//Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
//Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
//Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
//Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11".Replace("\r", "");

        var cards = input.Split("\n").Where(n => n.Length > 0).ToList();

        var totalPoints = 0;

        foreach (var card in cards)
        {
            var cardNumber = card.Split(":")[0];
            var numbers = card.Split(":")[1];

            var yourNumbers = numbers.Split(" | ")[0].Split(" ").Where(n => !string.IsNullOrEmpty(n.Trim()));
            var winningNumbers = numbers.Split(" | ")[1].Split(" ").Where(n => !string.IsNullOrEmpty(n.Trim()));

            var points = 0;

            foreach (var yourNumber in yourNumbers)
            {
                if (winningNumbers.Contains(yourNumber))
                {
                    if (points == 0)
                        points = 1;
                    else
                        points *= 2;
                }
            }

            totalPoints += points;

        }


        return totalPoints.ToString();
    }

    public override string PartTwo(string input)
    {
//        input = @"Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
//Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
//Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
//Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
//Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
//Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11".Replace("\r", "");

        var cards = input.Split("\n").Where(n => n.Length > 0).ToArray();

        var scratchBoards = new Dictionary<int, int>();

        for (var i = 0; i < cards.Length; i++)
        {
            scratchBoards[i] = 1;
        }

        for (var i = 0; i < cards.Length; i++)
        {
            var card = cards[i];

            var cardNumber = card.Split(":")[0];
            var numbers = card.Split(":")[1];

            var yourNumbers = numbers.Split(" | ")[0].Split(" ").Where(n => !string.IsNullOrEmpty(n.Trim()));
            var winningNumbers = numbers.Split(" | ")[1].Split(" ").Where(n => !string.IsNullOrEmpty(n.Trim()));

            var points = 0;

            foreach (var yourNumber in yourNumbers)
            {
                if (winningNumbers.Contains(yourNumber))
                {
                    points += 1;
                }
            }
            if (points > 0)
            {
                for (var j = 1; j <= points; j++)
                {
                    scratchBoards[i + j] += (scratchBoards[i]);
                }
            }
        }

        return scratchBoards.Sum(p => p.Value).ToString();
    }
}
