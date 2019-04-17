class Utils {
    static generateRandomNumberBetween(lowerBound, upperBound) {
        return Math.floor(Math.random() * (upperBound - lowerBound + 1) + lowerBound);
    }
    
    static generateNRandomNumbersBetween(count, lowerBound, upperBound) {
        const numberArray = [];
    
        while (numberArray.length < count) {
            const number = this.generateRandomNumberBetween(lowerBound, upperBound);
    
            if (!numberArray.includes(number)) {
                numberArray.push(number);
            }
        }
    
        return numberArray;
    }
    
    static createElementWith(element, { id, className }) {
        const domEl = document.createElement(element);
    
        if (id) {
            domEl.setAttribute('id', id);
        }
    
        if (className) {
            domEl.setAttribute('class', className);
        }
    
        return domEl;
    }
}

/* Knuth-Shuffle Algorithm */
Array.prototype.shuffle = function shuffle() {
    let currentIndex = this.length, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    [ this[currentIndex], this[randomIndex] ] = [ this[randomIndex], this[currentIndex] ];
  }
}
