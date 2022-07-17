import sleep from "../functions/sleep"
import { HEAP } from "./algorithmSettings"

async function heapSort(nums, highlight, swap, markCertain) {
    let n = nums.length;

    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        await heapify(nums, n, i, highlight, swap, markCertain);
    }

    // AFTER HEAP BUILDED
    let colors = {};
    for (let i = 0; i < n; i++) {
        colors[i] = HEAP.AFTER_HEAP_BUILD_CC;
    }
    highlight(colors);
    await sleep(HEAP.AFTER_HEAP_BUILD_SL);

    for (let i = n - 1; i > 0; i--) {
        // SWAP
        highlight({
            [i]: HEAP.SWAP_CC,
            0: HEAP.SWAP_CC,
        });
        await sleep(HEAP.SWAP_SL);
        swap(i, 0);
        markCertain(i);
        await heapify(nums, i, 0, highlight, swap, markCertain);


        // HIGHLIGHT CURRENT SUB HEAP
        let colors = {};
        for (let j = 0; j < i; j++) {
            colors[j] = HEAP.AFTER_HEAP_BUILD_CC;
        }
        highlight(colors);
        await sleep(HEAP.AFTER_HEAP_BUILD_SL);
    }
    markCertain(0);
}

async function heapify(nums, n, i, highlight, swap, markCertain) {
    let largest = i;
    let l = 2 * i + 1;
    let r = 2 * i + 2;
    highlight({
        [largest]: HEAP.HEAPIFY_LARGEST_CC,
        [l]: HEAP.HEAPIFY_CHILD_CC,
        [r]: HEAP.HEAPIFY_CHILD_CC,
    });
    await sleep(HEAP.HEAPIFY_SL);

    if (l < n && nums[l].value > nums[largest].value) {
        largest = l;
    }
    if (r < n && nums[r].value > nums[largest].value) {
        largest = r;
    }
    if (!(largest === i)) {
        swap(largest, i);
        await heapify(nums, n, largest, highlight, swap, markCertain);
    }
}

export default heapSort;