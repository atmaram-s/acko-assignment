class Match {
    static createMatchCardPlaceholder() {
        const matchCardPlaceholder = createElementWith('div', {
            className: 'match'
        });
    
        return matchCardPlaceholder;
    }

    constructor(matchData) {
        this.data = matchData;
    }

    start(completionHandler) {
        this.addMatchCard();

        setTimeout(() => {
            const winner = this.getWinner();
            let winnerIndex;

            if (winner) {
                winnerIndex = this.data.away;
            } else {
                winnerIndex = this.data.home;
            }

            const teamInfoEl = document.querySelectorAll(
                `#${ this.data.id } .match__team-info`
            );

            console.log('Team info', teamInfoEl, winner);
            teamInfoEl[winner].className = `${ teamInfoEl[winner].className } winner`;
            teamInfoEl[~~!winner].className = `${ teamInfoEl[~~!winner].className } loser`;

            completionHandler(winnerIndex, this.data);
        }, this.getMatchTime());
    }

    getMatchTime() {
        return generateRandomNumberBetween(5000, 10000);
    }

    getWinner() {
        return generateRandomNumberBetween(0, 1);
    }

    addMatchCard() {
        const matchCard = createElementWith('div', {
            className: 'match__details',
            id: this.data.id
        });

        const homeTeamInfo = this.generateTeamInfo(this.data.home);
        const awayTeamInfo = this.generateTeamInfo(this.data.away);
        const vsText = createElementWith('div', {
            className: 'match__vs-txt'
        });
        vsText.append('vs');

        matchCard.append(homeTeamInfo);
        matchCard.append(vsText);
        matchCard.append(awayTeamInfo);

        const matchContainer = document.querySelectorAll(`#${ this.data.roundId } .match`)[this.data.index];
        matchContainer.append(matchCard);
    }

    generateTeamInfo(teamIndex) {
        const teamdata = teams[teamIndex];
        const matchTeamInfoEl = createElementWith('div', {
            className: 'match__team-info',
            id:`${ this.data.id }-${ teamdata.teamId }`
        });

        matchTeamInfoEl.innerHTML = `
            <h1>${ teamdata.abbreviation }</h1>
            <h2>${ teamdata.teamName }</h2>
            <span>${ teamdata.location }</span>
        `;

        return matchTeamInfoEl;
    }
}