import React from "react";
import "./SideBar.model.css"

/**
 * Sidebar component contains array length slider and algo buttons.
 * It takes general style attributes as props.
 */
class SideBar extends React.Component {
    constructor(props) {
        super(props);
        this.handleResize = this.handleResize.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
        this.sidebarSettings = props.sidebarSettings;
        this.arraySettings = props.arraySettings;
        this.state = {
            windowHeight: null,
            buttons: props.buttons,
            arrayLength: this.arraySettings.INITIAL_ARRAY_LENGTH,
            sliderRef: props.sliderRef,
            algoRunning: props.algoRunning,
        }
    }

    componentDidMount() {
        window.addEventListener('resize', this.handleResize);
        this.handleResize();
    }

    componentDidUpdate(prevProps) {
        if (!(this.props.buttons === prevProps.buttons)) {
            this.setState({
                buttons: this.props.buttons,
            });
        }
        if (!(this.props.algoRunning === prevProps.algoRunning)) {
            this.setState({
                algoRunning: this.props.algoRunning,
            });
        }
    }

    handleResize() {
        this.setState({
            windowHeight: window.innerHeight,
        })
    }

    // slider change handler
    handleOnChange(e) {
        if (this.state.algoRunning) {
            alert("You can not change array size when an algorithm is running.\nInstead of refresh the page.");
            return;
        }
        this.setState({
            arrayLength: e.target.value,
        });
        // updates array length on App.js
        this.props.handleSliderChange();
    }

    render() {
        return (
            <div className="SideBarWrapper"
                style={{
                    height: this.state.windowHeight,
                    width: `${this.sidebarSettings.WIDTH}%`,
                    marginLeft: `${this.sidebarSettings.MARGIN_LEFT}%`,
                    marginRight: `${this.sidebarSettings.MARGIN_RIGHT}%`,
                    marginTop: `${this.sidebarSettings.MARGIN_TOP}%`,
                    marginBottom: `${this.sidebarSettings.MARGIN_BOTTOM}%`,
                    backgroundColor: this.sidebarSettings.BG_COLOR,
                }}
            >
                <div className="ArrayLengthViewer">
                    Array Length: {this.state.arrayLength}
                </div>
                <input className="slider" type="range"
                    min={this.arraySettings.MIN} max={this.arraySettings.MAX}
                    value={this.state.arrayLength}
                    onChange={(e) => this.handleOnChange(e)} ref={this.state.sliderRef} />
                {this.state.buttons}
            </div>
        );
    }
}

export default SideBar;