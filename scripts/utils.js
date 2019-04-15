function generateRandomNumberBetween(lowerBound, upperBound) {
    return Math.floor(Math.random() * (upperBound - lowerBound + 1) + lowerBound);
}

function generateNRandomNumbersBetween(count, lowerBound, upperBound) {
    const numberArray = [];

    while (numberArray.length < count) {
        const number = generateRandomNumberBetween(lowerBound, upperBound);

        if (!numberArray.includes(number)) {
            numberArray.push(number);
        }
    }

    return numberArray;
}