'use strict';

/**
 * Shuffle an array using a Fisher-Yates shuffle O(n)
 * https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
 *
 * Take Note: The passed array will be changed and edited in place
 *
 * @param val - Array to shuffle
 */
function shuffle (arr:unknown[]):void {
    if (!Array.isArray(arr)) return;

    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));  //  Random index from 0 to i
        [arr[i], arr[j]] = [arr[j], arr[i]];            //  Swap elements
    }
}

export {shuffle, shuffle as default};
