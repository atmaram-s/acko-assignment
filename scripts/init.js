document.addEventListener('DOMContentLoaded', () => {
    const numberOfTeams = teams.length;
    const numberOfRounds = (Math.log(numberOfTeams) / Math.log(2));

    console.log('Rounds', numberOfRounds);

    if (numberOfRounds % 1 === 0) {
        const tournament = new Tournament();

        tournament.start();
    } else {
        alert('Match isn\'t possible with the number of teams provided');
    }
});