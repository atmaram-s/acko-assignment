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
