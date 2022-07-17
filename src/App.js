import React from "react";
import SideBar from "./components/SideBar";
import AlgoButton from "./components/AlgoButton";

import { SIDEBAR_SETTINGS, ITEMS_SETTINGS, ARRAY_SETTINGS } from "./settings";
import createRandomArray, { createItemArray } from "./functions/RandomArray";

import bubbleSort from "./sorting_algorithms/bubble";
import selectionSort from "./sorting_algorithms/selection";
import insertionSort from "./sorting_algorithms/insertion";
import cocktailSort from "./sorting_algorithms/cocktail";
import mergeSort from "./sorting_algorithms/merge";
import quickSort from "./sorting_algorithms/quick";
import heapSort from "./sorting_algorithms/heap";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.componentDidMount = this.componentDidMount.bind(this);

        this.highlight = this.highlight.bind(this);
        this.swap = this.swap.bind(this);
        this.markCertain = this.markCertain.bind(this);

        this.BubbleSort = this.BubbleSort.bind(this);
        this.SelectionSort = this.SelectionSort.bind(this);
        this.InsertionSort = this.InsertionSort.bind(this);
        this.CocktailSort = this.CocktailSort.bind(this);
        this.MergeSort = this.MergeSort.bind(this);
        this.QuickSort = this.QuickSort.bind(this);
        this.HeapSort = this.HeapSort.bind(this);

        this.startAlgorithm = this.startAlgorithm.bind(this);
        this.endAlgorithm = this.endAlgorithm.bind(this);
        this.createAlgoButtons = this.createAlgoButtons.bind(this);

        this.handleSliderChange = this.handleSliderChange.bind(this);
        this.sliderRef = React.createRef();

        this.state = {
            arrayLength: ARRAY_SETTINGS.INITIAL_ARRAY_LENGTH,
            items: createRandomArray(ARRAY_SETTINGS.INITIAL_ARRAY_LENGTH),
            itemArray: null,
            running: false,
            AlgoButtons: null,
            sorted: false,
        }
    }

    async componentDidMount() {
        this.setState({
            itemArray: createItemArray(this.state.items, ITEMS_SETTINGS),
        });
        await this.createAlgoButtons(true);
    }

    async handleSliderChange() {
        let newArrayLength = this.sliderRef.current.value;
        let items = createRandomArray(newArrayLength);
        let itemArray = createItemArray(items, ITEMS_SETTINGS);
        this.setState({
            arrayLength: newArrayLength,
            items: items,
            itemArray: itemArray,
            sorted: false,  // when length is changed array is also changed and not sorted anymore
        });
    }

    /**
     * return true if algorithm can start else return false
     * @returns bool
     */
    async startAlgorithm() {
        // If array is sorted warn the user and return false
        if (this.state.sorted) {
            alert("Since items are sorted, you need to change array length or refresh the page for run another run.");
            return false;
        }
        this.setState({
            running: true,
            sorted: false,
        });
        this.createAlgoButtons(false);
        return true;
    }

    async endAlgorithm() {
        this.setState({
            running: false,
            sorted: true,
        });
        this.createAlgoButtons(true);
    }

    /**
     * colorize given items with given color codes
     * @param {Object} colorDict color dictionary for specific items
     */
    async highlight(colorDict) {
        let itemArray = createItemArray(this.state.items, ITEMS_SETTINGS, colorDict);
        this.setState({
            itemArray: itemArray,
        });
    }

    /**
     * Swaps the indexes of current items array
     * @param {Number} i 
     * @param {Number} j 
     */
    async swap(i, j) {
        let items = this.state.items;
        let temp = items[i];
        items[i] = items[j];
        items[j] = temp;
        this.setState({
            items: items,
        });
    }

    /**
     * Marks the given index as certain
     * @param {Number} index 
     */
    async markCertain(index) {
        let items = this.state.items;
        items[index]["certain"] = true;
        this.setState({
            items: items,
        });
    }

    async BubbleSort() {
        if (!(await this.startAlgorithm())) {
            return;
        }
        await bubbleSort(this.state.items, this.highlight, this.swap, this.markCertain);
        let itemArray = createItemArray(this.state.items, ITEMS_SETTINGS);
        this.setState({
            itemArray: itemArray,
        });
        await this.endAlgorithm();
    }

    async SelectionSort() {
        if (!(await this.startAlgorithm())) {
            return;
        }
        await selectionSort(this.state.items, this.highlight, this.swap, this.markCertain);
        let itemArray = createItemArray(this.state.items, ITEMS_SETTINGS);
        this.setState({
            itemArray: itemArray,
        });
        await this.endAlgorithm();
    }

    async InsertionSort() {
        if (!(await this.startAlgorithm())) {
            return;
        }
        await insertionSort(this.state.items, this.highlight, this.swap, this.markCertain);
        let itemArray = createItemArray(this.state.items, ITEMS_SETTINGS);
        this.setState({
            itemArray: itemArray,
        });
        await this.endAlgorithm();
    }

    async CocktailSort() {
        if (!(await this.startAlgorithm())) {
            return;
        }
        await cocktailSort(this.state.items, this.highlight, this.swap, this.markCertain);
        let itemArray = createItemArray(this.state.items, ITEMS_SETTINGS);
        this.setState({
            itemArray: itemArray,
        });
        await this.endAlgorithm();
    }

    async MergeSort() {
        if (!(await this.startAlgorithm())) {
            return;
        }
        await mergeSort(this.state.items, 0, this.state.items.length - 1, this.highlight, this.swap, this.markCertain);
        let itemArray = createItemArray(this.state.items, ITEMS_SETTINGS);
        this.setState({
            itemArray: itemArray,
        });
        await this.endAlgorithm();
    }

    async QuickSort() {
        if (!(await this.startAlgorithm())) {
            return;
        }
        await quickSort(this.state.items, 0, this.state.items.length - 1, this.highlight, this.swap, this.markCertain);
        let itemArray = createItemArray(this.state.items, ITEMS_SETTINGS);
        this.setState({
            itemArray: itemArray,
        });
        await this.endAlgorithm();
    }

    async HeapSort() {
        if (!(await this.startAlgorithm())) {
            return;
        }
        await heapSort(this.state.items, this.highlight, this.swap, this.markCertain);
        let itemArray = createItemArray(this.state.items, ITEMS_SETTINGS);
        this.setState({
            itemArray: itemArray,
        });
        await this.endAlgorithm();
    }

    /**
     * Creates AlgoButtons
     * @param {Bool} clickable clickablity of buttons
     */
    async createAlgoButtons(clickable = !this.state.running) {
        let buttons = [
            <AlgoButton clickable={clickable} key={"button-0"} function={() => this.BubbleSort()} text={"Bubble Sort"} />,
            <AlgoButton clickable={clickable} key={"button-1"} function={() => this.SelectionSort()} text={"Selection Sort"} />,
            <AlgoButton clickable={clickable} key={"button-2"} function={() => this.InsertionSort()} text={"Insertion Sort"} />,
            <AlgoButton clickable={clickable} key={"button-3"} function={() => this.CocktailSort()} text={"Cocktail Sort"} />,
            <AlgoButton clickable={clickable} key={"button-4"} function={() => this.MergeSort()} text={"Merge Sort"} />,
            <AlgoButton clickable={clickable} key={"button-5"} function={() => this.QuickSort()} text={"Quick Sort"} />,
            <AlgoButton clickable={clickable} key={"button-6"} function={() => this.HeapSort()} text={"Heap Sort"} />,
        ];
        this.setState({
            AlgoButtons: buttons,
        });
    }

    render() {
        return (<div className="App">
            <SideBar buttons={this.state.AlgoButtons}
                sliderRef={this.sliderRef}
                algoRunning={this.state.running}
                handleSliderChange={() => this.handleSliderChange()}
                sidebarSettings={SIDEBAR_SETTINGS}
                arraySettings={ARRAY_SETTINGS} />
            {this.state.itemArray}
        </div>);
    }
}

export default App;
