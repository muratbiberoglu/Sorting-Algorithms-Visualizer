import sleep from "../functions/sleep"
import { SELECTION } from "./algorithmSettings"

async function selectionSort(nums, highlight, swap, markCertain) {
    var n = nums.length;
    let i, j;
    for (i = 0; i < n - 1; i++) {
        let min_index = i;

        for (j = i + 1; j < n; j++) {
            // COMPARE
            highlight({
                [min_index]: SELECTION.COMPARE_MIN_INDEX_CC,
                [j]: SELECTION.COMPARE_CC,
            });
            await sleep(SELECTION.COMPARE_SL);
            if (nums[j].value < nums[min_index].value) {
                min_index = j;
            }
        }
        // SWAP
        highlight({
            [min_index]: SELECTION.SWAP_MIN_INDEX_CC,
            [i]: SELECTION.SWAP_CC,
        });
        await sleep(SELECTION.SWAP_SL);
        swap(min_index, i);
        markCertain(i);
    }
    markCertain(n - 1);
    await sleep(50);
}

export default selectionSort;