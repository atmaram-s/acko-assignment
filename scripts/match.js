function getWinner() {
    return Math.floor(Math.random() * 2);
}

function getMatchTime() {
    return (Math.floor(Math.random() * (10 - 5 + 1)) + 5) * 1000;
}
class Match {
    constructor(matchData) {
        this.data = matchData;
    }

    start(completionHandler) {
        setTimeout(() => {
            const winner = getWinner();

            if (winner) {
                completionHandler(this.data.away, this.data);
            } else {
                completionHandler(this.data.home, this.data);
            }
        }, getMatchTime());
    }
}