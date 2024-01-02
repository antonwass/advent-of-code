using System;
using System.Collections.Generic;
namespace AdventOfCode2023
{
    internal static class Extensions
    {
        public static char[,] To2DimArray(this string[] stringArr)
        {
            var arr = new char[stringArr[0].Length, stringArr.Length];
            for (var y = 0; y < stringArr.Length; y++)
            {
                for (var x = 0; x < stringArr[y].Length; x++)
                {
                    arr[y, x] = stringArr[x][y];
                }
            }

            return arr;
        }
    }
}
