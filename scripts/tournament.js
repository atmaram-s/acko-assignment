
class Tournament {
    static createTournamentRounds(numberOfRounds) {
        const roundsArray = new Array((2 * numberOfRounds) + 1);
        const arrLength = roundsArray.length;
        const tournamentTreeContainer = document.getElementById('tournament-tree');
    
        for (let index = 0; index < numberOfRounds; index++) {
            let className = 'round';
    
            if (index === 0) {
                className += ' first';
            } else if (index === numberOfRounds - 1) {
                className += ' last';
            }
            const leftRound = Utils.createElementWith('div', {
                id: `lRound${ index + 1}`,
                className: `${ className } round--left`
            });
    
            const rightRound = Utils.createElementWith('div', {
                id: `rRound${ index + 1}`,
                className: `${ className } round--right`
            });
    
            roundsArray[index] = leftRound;
            roundsArray[arrLength - index - 1] = rightRound;
        }
    
        const finalRound = Utils.createElementWith('div', {
            id: 'finalRound',
            className: 'round'
        });
        roundsArray[numberOfRounds] = finalRound;
    
        roundsArray.forEach((round) => {
            tournamentTreeContainer.append(round);
        });
    }

    constructor() {
        this.level = 0;
    }

    start(numberOfRounds) {
        const start = 0;
        const count = teams.length >>> 1
        const mid = (count) - 1;
        const end = teams.length - 1;

        teams.shuffle();

        const leftWing = Utils.generateNRandomNumbersBetween(count, start, mid);
        const rightWing = Utils.generateNRandomNumbersBetween(count, mid + 1, end);

        this.createBracket(numberOfRounds, leftWing.length);
        this.startRounds(leftWing, rightWing);
    }

    createBracket(numberOfRounds, firstLevelTeamsCount) {
        let numberOfMatches = firstLevelTeamsCount;

        for (let index = 1; index <= numberOfRounds; index++) {
            numberOfMatches >>>= 1;
            const leftRoundContainer = document.getElementById(`lRound${ index }`);
            const rightRoundContainer = document.getElementById(`rRound${ index }`);

            for(let mIndex = 0; mIndex < numberOfMatches; mIndex++) {
                const isFirstHalf = mIndex < numberOfMatches >>> 1;
                const lMatch = Match.createMatchCardPlaceholder(isFirstHalf);
                const rMatch = Match.createMatchCardPlaceholder(isFirstHalf);
                
                leftRoundContainer.append(lMatch);
                rightRoundContainer.append(rMatch);
            }
        }

        const finalRoundContainer = document.getElementById('finalRound');
        const finalMatch = Match.createMatchCardPlaceholder();

        finalRoundContainer.append(finalMatch);
    }

    async startRounds(leftRoundTeams, rightRoundTeams) {
        try {
            if (leftRoundTeams.length === 1) {
                this.startFinalMatch(leftRoundTeams[0], rightRoundTeams[0]);
                return;
            }

            leftRoundTeams.shuffle();
            rightRoundTeams.shuffle();
    
            this.level += 1;
            const level = this.level;
    
            const leftRoundData = {
                teams: leftRoundTeams,
                id: `lRound${ level }`,
                level
            };
            const rightRoundData = {
                teams: rightRoundTeams,
                id: `rRound${ level }`,
                level
            };
            const leftRound = new Round(leftRoundData);
            const rightRound = new Round(rightRoundData);
            const roundsResolver = [];
    
            roundsResolver.push(leftRound.start(leftRoundData));
            roundsResolver.push(rightRound.start(rightRoundData));
    
            const [leftRoundWinners, rightRoundWinners] = await Promise.all(roundsResolver);

            this.startRounds(leftRoundWinners, rightRoundWinners);
        } catch (error) {
            console.error('Something went wrong', error);
        }
    }

    startFinalMatch(home, away) {
        const final = new Match({
            home,
            away,
            roundId: 'finalRound',
            index: 0,
            id: 'finalMatch'
        });

        final.start((winner) => {
            const winnerInfo = teams[winner];

            alert(`Winner winner chicken dinner: ${ winnerInfo.teamName }`)
        });
    }
}