using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;

namespace _2020.Days
{
    public class Day12 : BaseDay
    {
        public Day12() : base(12) { }

        private enum Direction
        {
            North,
            East,
            South,
            West
        }

        private class Position
        {
            public int X { get; set; }
            public int Y { get; set; }
        }

        private class Boat
        {
            public Position Waypoint { get; set; } = new Position { X = 10, Y = -1 };
            public int PositionX { get; set; } = 0;
            public int PositionY { get; set; } = 0;
            public Direction Direction { get; private set; } = Direction.East;
            private int _angle = 0;

            public void Rotate(int degrees)
            {
                _angle = (360 + _angle + degrees) % 360;
                Direction = _angle switch
                {
                    0 => Direction.East,
                    90 => Direction.North,
                    180 => Direction.West,
                    270 => Direction.South,
                    _ => throw new Exception("Unknown angle")
                };
            }

            public void RotateWaypoint(int degrees)
            {
                degrees = (360 + degrees) % 360;

                if (degrees == 90)
                {
                    var temp = Waypoint.Y;
                    Waypoint.Y = Waypoint.X;
                    Waypoint.X = temp;

                    Waypoint.Y *= -1;
                }
                else if(degrees == 180)
                {
                    Waypoint.X *= -1;
                    Waypoint.Y *= -1;
                }
                else if(degrees == 270)
                {
                    var temp = Waypoint.Y;
                    Waypoint.Y = Waypoint.X;
                    Waypoint.X = temp;

                    Waypoint.X *= -1;
                }
            }

            public Direction GetDirectionByString(string direction)
            {
                return direction switch
                {
                    "N" => Direction.North,
                    "W" => Direction.West,
                    "E" => Direction.East,
                    "S" => Direction.South,
                    _ => throw new Exception("Unknown direction string")
                };
            }
        }

        public override string PartOne(string input)
        {
            var actions = input.Split("\n");
            var boat = new Boat();

            foreach (var actionPair in actions)
            {
                var action = actionPair[..1];
                var value = int.Parse(actionPair[1..]);

                if (action == "R")
                {
                    boat.Rotate(value * -1);
                    continue;
                }
                else if (action == "L")
                {
                    boat.Rotate(value);
                    continue;
                }

                var direction = action switch
                {
                    "F" => boat.Direction,
                    var x when "NSWE".Contains(x) => boat.GetDirectionByString(action),
                    _ => throw new Exception("Unknown action")
                };

                switch (direction)
                {
                    case Direction.North:
                        boat.PositionY -= value;
                        break;
                    case Direction.South:
                        boat.PositionY += value;
                        break;
                    case Direction.East:
                        boat.PositionX += value;
                        break;
                    case Direction.West:
                        boat.PositionX -= value;
                        break;
                }
            }

            return (Math.Abs(boat.PositionX) + Math.Abs(boat.PositionY)).ToString();
        }

        public override string PartTwo(string input)
        {
            var actions = input.Split("\n");
            var boat = new Boat();

            foreach (var actionPair in actions)
            {
                var action = actionPair[..1];
                var value = int.Parse(actionPair[1..]);

                if (action == "R")
                {
                    boat.RotateWaypoint(value * -1);
                }
                else if (action == "L")
                {
                    boat.RotateWaypoint(value);
                }
                else if("NSWE".Contains(action))
                {
                    var direction = boat.GetDirectionByString(action);
                    switch (direction)
                    {
                        case Direction.North:
                            boat.Waypoint.Y -= value;
                            break;
                        case Direction.South:
                            boat.Waypoint.Y += value;
                            break;
                        case Direction.East:
                            boat.Waypoint.X += value;
                            break;
                        case Direction.West:
                            boat.Waypoint.X -= value;
                            break;
                    }

                }
                else if(action == "F")
                {
                    boat.PositionX += (boat.Waypoint.X * value);
                    boat.PositionY += (boat.Waypoint.Y * value);
                }
                else
                {
                    throw new Exception("Unknown actionpair");
                }
            }

            return (Math.Abs(boat.PositionX) + Math.Abs(boat.PositionY)).ToString();
        }
    }
}
