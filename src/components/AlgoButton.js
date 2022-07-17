import React from "react";
import "./AlgoButton.model.css"

/**
 * Button component for running algorithm.
 * It takes text for displaying to user,
 * function for running algorithm and
 * clickablity of button as props.
 */
class AlgoButton extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            text: props.text,
            function: props.function,
            clickable: props.clickable,
        }
    }

    componentDidUpdate(prevProps) {
        if (!(this.props.clickable === prevProps.clickable)) {
            this.setState({
                clickable: this.props.clickable,
            })
        }
    }

    handleClick() {
        if (this.state.clickable) {
            this.state.function();
        } else {
            alert("There is an algorithm which is already running\nIf you want to run another algorithm, refresh the page.");
        }
    }

    render() {
        return (
            <div className="AlgoButtonWrapper"
                onClick={this.handleClick}
                style={{
                    opacity: this.state.clickable ? 1 : 0.5,
                }}
            >
                {this.state.text}
            </div>
        );
    }
}

export default AlgoButton;