using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;

namespace _2020.Days
{
    public class Day14 : BaseDay
    {
        public Day14() : base(14) { }

        public override string PartOne(string input)
        {
            var instructions = input.Split("\n");
            string mask = null;

            var memory = new Dictionary<string, string>();

            foreach (var instruction in instructions)
            {
                var split = instruction.Split(" = ");

                if (split[0] == "mask")
                {
                    mask = split[1];
                    continue;
                }

                var key = split[0];
                var value = int.Parse(split[1]);

                if (!memory.TryGetValue(key, out var memoryValue))
                    memoryValue = "000000000000000000000000000000000000";

                var valueInBase2 = Convert.ToString(value, 2).PadLeft(36, '0');

                var result = new char[36];

                for(var i = 1; i <= result.Length; i++)
                {
                    result[^i] = memoryValue[^i];
                    result[^i] = valueInBase2[^i];
                    if(mask != null && mask[^i] != 'X')
                        result[^i] = mask[^i];
                }

                memory[key] = new string(result);

            }

            return memory
                .Select(x => Convert.ToInt64(x.Value, 2))
                .Sum()
                .ToString();
        }

        public override string PartTwo(string input)
        {
            var instructions = input.Split("\n");
            string mask = null;

            var memory = new Dictionary<long, string>();

            foreach (var instruction in instructions)
            {
                var split = instruction.Split(" = ");

                if (split[0] == "mask")
                {
                    mask = split[1];
                    continue;
                }

                var address = int.Parse(new string(split[0].TrimEnd(']').Skip(4).ToArray()));
                var value = int.Parse(split[1]);

                var valueInBase2 = Convert.ToString(value, 2).PadLeft(36, '0');
                WriteValue(memory, mask, valueInBase2, address);
            }

            return memory
                .Select(x => Convert.ToInt64(x.Value, 2))
                .Sum()
                .ToString();
        }

        private static void WriteValue(IDictionary<long, string> memory, string mask, string value, long address)
        {
            var addressBase2 = Convert.ToString(address, 2).PadLeft(36, '0');

            var newAddressArr = new char[36];

            for (var i = 1; i <= newAddressArr.Length; i++)
            {
                newAddressArr[^i] = addressBase2[^i];

                if (mask[^i] == '1' || mask[^i] == 'X')
                    newAddressArr[^i] = mask[^i];
            }

            var newAddress = new string(newAddressArr);

            var addresses = ComputeFloatAddresses(newAddress, new List<string>());

            foreach (var floatAddress in addresses)
            {
                var key = Convert.ToInt64(floatAddress, 2);
                memory[key] = value;
            }
        }

        private static IList<string> ComputeFloatAddresses(string address, IList<string> addressList)
        {
            for (var i = 1; i <= address.Length; i++)
            {
                if (address[^i] == 'X')
                {
                    var addressArr = address.ToCharArray();
                    var firstFloatingIndex = address.IndexOf('X');

                    addressArr[firstFloatingIndex] = '0';
                    ComputeFloatAddresses(new string(addressArr), addressList);

                    addressArr[firstFloatingIndex] = '1';
                    ComputeFloatAddresses(new string(addressArr), addressList);
                    return addressList;
                }
            }

            addressList.Add(address);
            return addressList;
        }
    }
}
