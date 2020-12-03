using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _2020.Extensions
{
    public static class StringExtensions
    {
        /// <summary>
        /// "xxx\r\nxxx" => [x,y]
        /// </summary>
        /// <param name="raw"></param>
        /// <returns>[x,y]</returns>
        public static char[,] To2DArray(this string raw)
        {
            var split = raw.Split("\r\n");

            var newArr = new char[split[0].Length, split.Length];

            for (var i = 0; i < split.Length; i++)
            {
                for (var j = 0; j < split[i].Length; j++)
                {
                    newArr[j, i] = split[i][j];
                }
            }

            return newArr;
        }
    }
}
