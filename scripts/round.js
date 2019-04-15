class Round {
    constructor(roundData) {
        this.data = roundData;
        this.winners = new Array(roundData.teams.length >>> 1).fill(undefined);

        this.handleMatchCompletion = this.handleMatchCompletion.bind(this);
    }

    start() {
        return new Promise((resolve) => {
            this.roundResolver = resolve;
            const { teams: roundTeams } = this.data;
            const roundLength = roundTeams.length;

            for (let index = 0; index < roundLength; index += 2) {
                const home = roundTeams[index];
                const away = roundTeams[index + 1];

                const matchData = {
                    home,
                    away,
                    matchId: `m-${ Date.now }-${ index }`,
                    index: index >>> 1
                };
                const match = new Match(matchData);
                match.start(this.handleMatchCompletion)
            }
        });
    }

    handleMatchCompletion(winner, matchData) {
        this.winners[matchData.index] = winner;

        if (!this.winners.includes(undefined)) {
            console.log('Round won', this.winners);
            this.roundResolver(this.winners);
        }
    }
}