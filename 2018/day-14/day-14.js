let Day = require('../../day.js');

class Day14 extends Day {
    constructor(callback) {
        super(callback);
        this.day = 14;
    }
    part1(input) {
        let targetRecipes = 330121;
        let answer;

        let scoreBoard = [3, 7];
        let elf1CurrentRecipeIndex = 0;
        let elf2CurrentRecipeIndex = 1;

        while (scoreBoard.length - 10 < targetRecipes) {
            let currentRecipe1 = scoreBoard[elf1CurrentRecipeIndex];
            let currentRecipe2 = scoreBoard[elf2CurrentRecipeIndex];
            let sum = currentRecipe1 + currentRecipe2;
            let singleDigit, tenthDigit;

            if (sum > 9) {
                tenthDigit = parseInt((sum / 10))
                singleDigit = sum % 10;
            }
            else {
                singleDigit = sum;
            }

            if (tenthDigit)
                scoreBoard.push(tenthDigit);
            scoreBoard.push(singleDigit);

            elf1CurrentRecipeIndex = (elf1CurrentRecipeIndex + 1 + currentRecipe1) % scoreBoard.length;
            elf2CurrentRecipeIndex = (elf2CurrentRecipeIndex + 1 + currentRecipe2) % scoreBoard.length;
        }

        // console.log(scoreBoard);
        answer = scoreBoard.splice(targetRecipes, 10).join('');
        // answer = scoreBoard;
        console.log(answer);
        return answer;
    }

    part2(input) {
        let targetRecipesArr = [3, 3, 0, 1, 2, 1];
        let targetRecipes = 330121;
        let answer = -1;

        let scoreBoard = [3, 7];
        let elf1CurrentRecipeIndex = 0;
        let elf2CurrentRecipeIndex = 1;

        let prevIndex = 0;

        while (answer<0) {
            let currentRecipe1 = scoreBoard[elf1CurrentRecipeIndex];
            let currentRecipe2 = scoreBoard[elf2CurrentRecipeIndex];
            let sum = currentRecipe1 + currentRecipe2;
            let singleDigit, tenthDigit;

            if (sum > 9) {
                tenthDigit = parseInt((sum / 10))
                singleDigit = sum % 10;
            }
            else {
                singleDigit = sum;
            }

            if (tenthDigit)
                scoreBoard.push(tenthDigit);
            scoreBoard.push(singleDigit);

            elf1CurrentRecipeIndex = (elf1CurrentRecipeIndex + 1 + currentRecipe1) % scoreBoard.length;
            elf2CurrentRecipeIndex = (elf2CurrentRecipeIndex + 1 + currentRecipe2) % scoreBoard.length;
            

            for (let i = prevIndex; i < scoreBoard.length - 5; i++) {
                prevIndex++;
                if (scoreBoard[i] === targetRecipesArr[0]
                    && scoreBoard[i + 1] === targetRecipesArr[1]
                    && scoreBoard[i + 2] === targetRecipesArr[2]
                    && scoreBoard[i + 3] === targetRecipesArr[3]
                    && scoreBoard[i + 4] === targetRecipesArr[4]
                    && scoreBoard[i + 5] === targetRecipesArr[5]) {
                    answer = i;
                    break;
                }
            }
        }


        console.log(answer);
        return answer;
    }
}

module.exports = Day14;