document.addEventListener('DOMContentLoaded', () => {
    const numberOfTeams = teams.length;
    const exponent = (Math.log(numberOfTeams) / Math.log(2));

    if (exponent % 1 === 0) {
        const numberOfRounds = exponent - 1;
        createTournamentRounds(numberOfRounds);

        const tournament = new Tournament();
        tournament.start(numberOfRounds);
    } else {
        alert('Match isn\'t possible with the number of teams provided');
    }
});

function createTournamentRounds(numberOfRounds) {
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
        const leftRound = createElementWith('div', {
            id: `lRound${ index + 1}`,
            className: `${ className } round--left`
        });

        const rightRound = createElementWith('div', {
            id: `rRound${ index + 1}`,
            className: `${ className } round--right`
        });

        roundsArray[index] = leftRound;
        roundsArray[arrLength - index - 1] = rightRound;
    }

    const finalRound = createElementWith('div', {
        id: 'finalRound',
        className: 'round'
    });
    roundsArray[numberOfRounds] = finalRound;

    roundsArray.forEach((round) => {
        tournamentTreeContainer.append(round);
    });
}