import Item from "../components/Item";
import shuffle from "./shuffle";

/**
 * creates random array with given length
 * @param {Number} length length of array to be created
 * @returns shuffled array in range [1, length]
 */
function createRandomArray(length) {
    let array = [];
    for (let i = 0; i < length; i++) {
        array.push({
            value: i + 1,
            id: i,
        });
    }
    return shuffle(array);
}

/**
 * Creates array of Items (Component) with respect to given array
 * @param {Array} array array of numbers
 * @param {*} SETTINGS settings of items related to style
 * @param {*} colorDict dictionary for specific indexes' color codes
 * @returns Array of Items
 */
export function createItemArray(array, SETTINGS, colorDict = {}) {
    let length = array.length;

    let SPACE = SETTINGS.SPACE_BETWEEN_COMPONENTS;
    let WIDTH = SETTINGS.COMPONENT_WIDTH;
    let LR_MARGIN = SETTINGS.LEFT_RIGHT_SPACE;
    let ITEMS_BACKGROUND_WIDTH = SETTINGS.ITEMS_BACKGROUND_WIDTH;
    let SIDE_BAR_WIDTH = 100 - ITEMS_BACKGROUND_WIDTH;
    let UNIT_WIDTH = ITEMS_BACKGROUND_WIDTH / (2 * LR_MARGIN + (WIDTH * length) + ((length - 1) * SPACE));

    let TOP_BOTTOM_MARGIN = SETTINGS.TOP_BOTTOM_MARGIN;

    let UNIT_HEIGHT = (100 - 2 * TOP_BOTTOM_MARGIN) / length;


    let items_array = [];
    for (let i = 0; i < array.length; i++) {
        let bgcolor;
        if (array[i].certain) {
            bgcolor = SETTINGS.CERTAIN_BG_COLOR;
        } else {
            bgcolor = colorDict[i] ? colorDict[i] : SETTINGS.BG_COLOR;
        }
        let style = {
            top: TOP_BOTTOM_MARGIN,
            bottom: null,
            left: SIDE_BAR_WIDTH + UNIT_WIDTH * (LR_MARGIN + i * (SPACE + WIDTH)),
            right: null,
            height: UNIT_HEIGHT * array[i].value,
            width: UNIT_WIDTH * WIDTH,
            bgcolor: bgcolor,
        };
        items_array.push(<Item value={array[i].value}
            key={array[i].id}
            style={style} />);
    }
    return items_array;
}

export default createRandomArray;