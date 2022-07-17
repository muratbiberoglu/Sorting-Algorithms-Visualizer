import sleep from "../functions/sleep"
import { BUBBLE } from "./algorithmSettings"

async function bubbleSort(nums, highlight, swap, markCertain) {
    var n = nums.length;
    var i, j;
    for (i = 0; i < n - 1; i++) {
        let swapped = false;
        for (j = 0; j < n - i - 1; j++) {
            // COMPARE
            highlight({
                [j]: BUBBLE.COMPARE_CC,
                [j + 1]: BUBBLE.COMPARE_CC,
            });
            await sleep(BUBBLE.COMPARE_SL);

            if (nums[j].value > nums[j + 1].value) {
                // SWAP
                highlight({
                    [j]: BUBBLE.SWAP_CC,
                    [j + 1]: BUBBLE.SWAP_CC,
                });
                await sleep(BUBBLE.SWAP_SL);

                swap(j, j + 1);
                swapped = true;
            }
        }
        markCertain(n - 1 - i);

        if (!swapped) {
            break;
        }
    }

    for (let i = 0; i < n; i++) {
        markCertain(i);
    }
}

export default bubbleSort;