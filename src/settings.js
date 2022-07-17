export const ARRAY_SETTINGS = {
    MIN: 2,
    MAX: 128,
    INITIAL_ARRAY_LENGTH: 32,
}

const SIDEBAR_WIDTH = 24;

export const SIDEBAR_SETTINGS = {
    WIDTH: SIDEBAR_WIDTH,
    MARGIN_LEFT: 0,
    MARGIN_RIGHT: 100 - SIDEBAR_WIDTH,
    MARGIN_TOP: 0,
    MARGIN_BOTTOM: 0,
    BG_COLOR: "#444",
}

export const ITEMS_SETTINGS = {
    ITEMS_BACKGROUND_WIDTH: 100 - SIDEBAR_WIDTH,

    SPACE_BETWEEN_COMPONENTS: 2,    // coefficient
    COMPONENT_WIDTH: 5,             // coefficient
    LEFT_RIGHT_SPACE: 25,           // coefficient

    TOP_BOTTOM_MARGIN: 5,           // percentage
    BG_COLOR: "#444",               // default bg color
    CERTAIN_BG_COLOR: "#bb00ff",    // certain bg color
}