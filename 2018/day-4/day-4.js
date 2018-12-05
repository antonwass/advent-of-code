let Day = require('../../day.js');

class Day4 extends Day {
    constructor(callback) {
        super(callback);
        this.day = 4;
    }
    part1(input) {
        let answer;
        const sleepSchedule = {};
        const records = input.split('\r\n').map(record => {
            return {
                date: new Date(record.substring(1, 17)),
                event: record.substring(19, record.length)
            };
        }).sort((a, b) => {
            return a.date - b.date;
        });

        //console.log(records);

        let currentGuard;
        let fellAsleepDate;
        for (let record of records) {
            if (record.event.includes('#')) {
                // guard begins shift
                currentGuard = record.event
                    .split(' ')[1]
                    .substring(1, record.event.split(' ')[1].length);
                if (!sleepSchedule[currentGuard]) {
                    sleepSchedule[currentGuard] = { total: 0, minutes: {} };
                }
            }
            else if (record.event.includes('asleep')) {
                // guard fell asleep
                fellAsleepDate = record.date;
            }
            else if (record.event.includes('wakes')) {
                // guard woke up
                const minutes = Math.abs(record.date.getMinutes() - fellAsleepDate.getMinutes());
                sleepSchedule[currentGuard].total += (minutes);
                // console.log('guard', currentGuard);
                // console.log('min', minutes);
                for (let i = fellAsleepDate.getMinutes(); i < fellAsleepDate.getMinutes() + minutes; i++) {
                    if (sleepSchedule[currentGuard].minutes[i]) {
                        sleepSchedule[currentGuard].minutes[i]++;
                    } else {
                        sleepSchedule[currentGuard].minutes[i] = 1;
                    }
                }

                // console.log(sleepSchedule[currentGuard].minutes);

            }
        }

        let sleepiestGuard;
        for (const guard of Object.keys(sleepSchedule)) {
            if (!sleepiestGuard)
                sleepiestGuard = guard;
            else {
                if (sleepSchedule[sleepiestGuard].total < sleepSchedule[guard].total) {
                    sleepiestGuard = guard;
                }
            }
        }

        // find the sleepiest minute
        let sleepiestMinute;
        const guardMinutes = sleepSchedule[sleepiestGuard].minutes;
        for (const minute of Object.keys(guardMinutes)) {
            if (!sleepiestMinute) {
                sleepiestMinute = minute;
            } else {
                if (guardMinutes[minute] > guardMinutes[sleepiestMinute]) {
                    sleepiestMinute = minute;
                }
            }
        }

        // console.log(sleepSchedule);
        // console.log(guardMinutes);
        // console.log('schedule', JSON.stringify(sleepSchedule));
        // console.log('guard', sleepiestGuard);
        // console.log('guardTotal', sleepSchedule[sleepiestGuard].total);
        // console.log('sleepiestMinute', sleepiestMinute);
        answer = sleepiestGuard * sleepiestMinute;
        // console.log('answer', answer);
        return answer;
    }

    part2(input) {
        let answer;
        const sleepSchedule = {};
        const records = input.split('\r\n').map(record => {
            return {
                date: new Date(record.substring(1, 17)),
                event: record.substring(19, record.length)
            };
        }).sort((a, b) => {
            return a.date - b.date;
        });

        //console.log(records);

        let currentGuard;
        let fellAsleepDate;
        for (let record of records) {
            if (record.event.includes('#')) {
                // guard begins shift
                currentGuard = record.event
                    .split(' ')[1]
                    .substring(1, record.event.split(' ')[1].length);
                if (!sleepSchedule[currentGuard]) {
                    sleepSchedule[currentGuard] = { total: 0, minutes: {} };
                }
            }
            else if (record.event.includes('asleep')) {
                // guard fell asleep
                fellAsleepDate = record.date;
            }
            else if (record.event.includes('wakes')) {
                // guard woke up
                const minutes = Math.abs(record.date.getMinutes() - fellAsleepDate.getMinutes());
                sleepSchedule[currentGuard].total += (minutes);
                // console.log('guard', currentGuard);
                // console.log('min', minutes);
                for (let i = fellAsleepDate.getMinutes(); i < fellAsleepDate.getMinutes() + minutes; i++) {
                    if (sleepSchedule[currentGuard].minutes[i]) {
                        sleepSchedule[currentGuard].minutes[i]++;
                    } else {
                        sleepSchedule[currentGuard].minutes[i] = 1;
                    }
                }

                // console.log(sleepSchedule[currentGuard].minutes);

            }
        }

        let sleepiestGuard;
        let sleepiestMinute;

        for (const guard of Object.keys(sleepSchedule)) {

            // if (!sleepiestGuard)
            //     sleepiestGuard = guard;
            
            let guardSleepiestMinute;
            const guardMinutes = sleepSchedule[guard].minutes;
            for (const minute of Object.keys(guardMinutes)) {
                if (!guardSleepiestMinute) {
                    guardSleepiestMinute = minute;
                }
                if(guardMinutes[minute] > guardMinutes[guardSleepiestMinute]) {
                    guardSleepiestMinute = minute;
                }
            }
            if (!sleepiestMinute) {
                sleepiestGuard = guard;
                sleepiestMinute = guardSleepiestMinute;
            }
            else if (guardMinutes[guardSleepiestMinute] > sleepSchedule[sleepiestGuard].minutes[sleepiestMinute]) {
                sleepiestGuard = guard;
                sleepiestMinute = guardSleepiestMinute;
            }
            
        }

        console.log(sleepSchedule);
        // console.log(guardMinutes);
        //console.log('schedule', JSON.stringify(sleepSchedule));
        console.log('guard', sleepiestGuard);
        console.log('guardTotal', sleepSchedule[sleepiestGuard].total);
        console.log('sleepiestMinute', sleepiestMinute);
        answer = sleepiestGuard * sleepiestMinute;
        console.log('answer', answer);
        return answer;
    }
}

module.exports = Day4;