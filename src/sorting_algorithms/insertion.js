import sleep from "../functions/sleep"
import { INSERTION } from "./algorithmSettings"

async function insertionSort(nums, highlight, swap, markCertain) {
    let i, key, j;
    let n = nums.length;
    for (i = 1; i < n; i++) {
        key = nums[i];
        j = i - 1;

        while (j >= 0) {
            for (let k = 0; k <= j; k++) {
                markCertain(k);
            }
            if (nums[j].value < key.value) {
                // CORRECT_POSITION
                highlight({
                    [j + 1]: INSERTION.CORRECT_POSITION_CC,
                });
                await sleep(INSERTION.CORRECT_POSITION_SL);
                break;
            }
            // COMPARE_AND_SWAP
            highlight({
                [j + 1]: INSERTION.COMPARE_AND_SWAP_CC,
            });
            await sleep(INSERTION.COMPARE_AND_SWAP_SL);
            swap(j, j + 1);
            j = j - 1;
        }

        // for minimum element because of the while condition
        // it can not colorize the correct position of minimum elment
        if (j === -1) {
            highlight({
                [j + 1]: INSERTION.CORRECT_POSITION_CC,
            });
            await sleep(INSERTION.COMPARE_AND_SWAP_SL);
        }
        nums[j + 1] = key;
    }
    for (let i = 0; i < n; i++) {
        markCertain(i);
    }
    await sleep(200);
}

export default insertionSort;