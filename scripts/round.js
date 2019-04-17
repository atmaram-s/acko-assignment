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

                const matchIndex = index >>> 1;

                const matchData = {
                    home,
                    away,
                    id: `m-${ this.data.id }-${ matchIndex }`,
                    roundId: this.data.id,
                    index: matchIndex
                };
                const match = new Match(matchData);
                match.start(this.handleMatchCompletion)
            }
        });
    }

    handleMatchCompletion(winner, matchData) {
        this.winners[matchData.index] = winner;

        if (!this.winners.includes(undefined)) {
            this.roundResolver(this.winners);
        }
    }
}