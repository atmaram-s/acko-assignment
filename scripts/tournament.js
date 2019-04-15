function generateNRandomNumbersBetween(count, lowerBound, upperBound) {
    const numberArray = [];

    while (numberArray.length < count) {
        const number = Math.floor(Math.random() * (upperBound - lowerBound + 1) + lowerBound);

        if (!numberArray.includes(number)) {
            numberArray.push(number);
        }
    }

    return numberArray;
}

class Tournament {
    constructor() {
        this.level = 0;
    }

    start() {
        const start = 0;
        const count = teams.length >>> 1
        const mid = (count) - 1;
        const end = teams.length - 1;

        const leftWing = generateNRandomNumbersBetween(count, start, mid);
        const rightWing = generateNRandomNumbersBetween(count, mid + 1, end);

        this.startRounds(leftWing, rightWing);
    }

    async startRounds(leftRoundTeams, rightRoundTeams) {
        try {
            if (leftRoundTeams.length === 1) {
                this.startFinalMatch(leftRoundTeams[0], rightRoundTeams[0]);
                return;
            }
    
            this.level += 1;
            const level = this.level;
    
            const leftRoundData = {
                teams: leftRoundTeams,
                roundId: `left-wing--level-${ level }`,
                level
            };
            const rightRoundData = {
                teams: rightRoundTeams,
                roundId: `right-wing--level-${ level }`,
                level
            };
            const leftRound = new Round(leftRoundData);
            const rightRound = new Round(rightRoundData);
            const roundsResolver = [];
    
            roundsResolver.push(leftRound.start(leftRoundData));
            roundsResolver.push(rightRound.start(rightRoundData));
    
            const [leftRoundWinners, rightRoundWinners] = await Promise.all(roundsResolver);

            console.log('Winners!!!!!!', leftRoundWinners, rightRoundWinners);
            this.startRounds(leftRoundWinners, rightRoundWinners);
        } catch (error) {
            console.log('Error homie', error);
        }
    }

    startFinalMatch(home, away) {
        const final = new Match({ home, away });
        final.start((winner) => {
            console.log('Winner winner', winner);
        });
    }
}