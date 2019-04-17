document.addEventListener('DOMContentLoaded', () => {
    const numberOfTeams = teams.length;
    const exponent = (Math.log(numberOfTeams) / Math.log(2));

    if (exponent % 1 === 0) {
        const numberOfRounds = exponent - 1;
        Tournament.createTournamentRounds(numberOfRounds);

        const tournament = new Tournament();
        tournament.start(numberOfRounds);
    } else {
        alert('Match isn\'t possible with the number of teams provided');
    }
});