import sleep from "../functions/sleep"
import { MERGE } from "./algorithmSettings"

async function merge(nums, l, mid, r, highlight, swap) {
    if (nums[mid].value <= nums[mid + 1].value) {
        return;
    }

    let start1 = l;
    let start2 = mid + 1;

    // make comparision and merge the array
    while (start1 <= mid && start2 <= r) {
        // MERGE WITH POINTERS
        highlight({
            [start1]: MERGE.LEFT_POINTER_CC,
            [start2]: MERGE.RIGHT_POINTER_CC,
        });
        await sleep(MERGE.POINTERS_SL);
        if (nums[start1].value <= nums[start2].value) {
            start1++;
        } else {
            for (let i = start2; i > start1; i--) {
                swap(i, i - 1);
            }
            start1++;
            mid++;
            start2++;
        }
    }
}

async function mergeSort(nums, l, r, highlight, swap, markCertain) {
    if (l >= r) {
        return;
    }

    let mid = Math.floor((l + r) / 2);
    await mergeSort(nums, l, mid, highlight, swap, markCertain);
    await mergeSort(nums, mid + 1, r, highlight, swap, markCertain);

    // TO BE MERGED
    // colorize to be merged parts
    let colors = {};
    for (let i = l; i <= mid; i++) {
        colors[i] = MERGE.TO_BE_MERGED_LEFT_CC;
    }
    for (let i = mid + 1; i <= r; i++) {
        colors[i] = MERGE.TO_BE_MERGED_RIGHT_CC;
    }
    highlight(colors);
    await sleep(MERGE.TO_BE_MERGED_SL);

    await merge(nums, l, mid, r, highlight, swap);

    // If function finished mark_certain all
    if (l === 0 && r === nums.length - 1) {
        for (let i = 0; i <= r; i++) {
            markCertain(i);
        }
    } else {
        // AFTER MERGE
        colors = {};
        for (let i = l; i <= r; i++) {
            colors[i] = MERGE.AFTER_MERGED_CC;
        }
        highlight(colors);
        await sleep(MERGE.AFTER_MERGED_SL);
    }
}

export default mergeSort;