import sleep from "../functions/sleep"
import { COCKTAIL } from "./algorithmSettings"

async function cocktailSort(nums, highlight, swap, markCertain) {
    let n = nums.length;
    let swapped = true;
    let start = 0;
    let end = n - 1;

    while (swapped === true) {
        swapped = false;

        for (let i = start; i < end; ++i) {
            // COMPARE
            highlight({
                [i]: COCKTAIL.COMPARE_CC,
                [i + 1]: COCKTAIL.COMPARE_CC,
            });
            await sleep(COCKTAIL.COMPARE_SL);

            if (nums[i].value > nums[i + 1].value) {
                // SWAP
                highlight({
                    [i]: COCKTAIL.SWAP_CC,
                    [i + 1]: COCKTAIL.SWAP_CC,
                });
                await sleep(COCKTAIL.SWAP_SL);
                swap(i, i + 1);

                swapped = true;
            }
        }
        markCertain(end);

        if (swapped === false) {
            break;
        }

        swapped = false;
        end--;

        for (let i = end - 1; i >= start; i--) {
            // COMPARE
            highlight({
                [i]: COCKTAIL.COMPARE_CC,
                [i + 1]: COCKTAIL.COMPARE_CC,
            });
            await sleep(COCKTAIL.COMPARE_SL);
            if (nums[i].value > nums[i + 1].value) {
                // SWAP
                highlight({
                    [i]: COCKTAIL.SWAP_CC,
                    [i + 1]: COCKTAIL.SWAP_CC,
                });
                await sleep(COCKTAIL.SWAP_SL);
                swap(i, i + 1);

                swapped = true;
            }
        }
        markCertain(start);

        start++;
    }
    for (let i = 0; i < n; i++) {
        markCertain(i);
    }
}

export default cocktailSort