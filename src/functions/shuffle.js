/**
 * Shuffles the given array according to Fisher-Yates algorithm.
 * For more details see https://stackoverflow.com/a/2450976
 * @param {Array} array
 * @returns shuffled array
 */
function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (!(currentIndex === 0)) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}

export default shuffle;