import sleep from "../functions/sleep"
import { QUICK } from "./algorithmSettings"

async function partition(nums, l, r, highlight, swap, markCertain) {
    let pivot = nums[r].value;
    // current pivot index
    let pi = l;

    for (let i = l; i <= r - 1; i++) {
        // COMPARE
        highlight({
            [i]: QUICK.COMPARE_CC,
            [pi]: QUICK.PIVOT_COMPARE_CC,
            [r]: QUICK.RIGHT_COMPARE_CC,
        }
        );
        await sleep(QUICK.COMPARE_SL);

        if (nums[i].value < pivot) {
            // SWAP
            highlight({
                [i]: QUICK.SWAP_CC,
                [pi]: QUICK.PIVOT_SWAP_CC,
                [r]: QUICK.RIGHT_SWAP_CC,
            }
            );
            swap(pi, i);
            pi++;
            await sleep(QUICK.SWAP_SL);
        }
    }
    swap(pi, r);
    markCertain(pi);
    // PIVOT FOUND
    await sleep(QUICK.PIVOT_FOUND_SL);
    return pi;
}

async function quickSort(nums, l, r, highlight, swap, markCertain) {
    if (l < r) {
        let pi = await partition(nums, l, r, highlight, swap, markCertain);

        await quickSort(nums, l, pi - 1, highlight, swap, markCertain);
        await quickSort(nums, pi + 1, r, highlight, swap, markCertain);
    }

    if (r < l) {
        let temp = l;
        l = r;
        r = temp;
    }

    // Don't go outside of boundries
    l = l < 0 ? 0 : l;
    r = r >= nums.length ? nums.length - 1 : r;

    for (let i = l; i <= r; i++) {
        markCertain(i);
    }
}

export default quickSort;