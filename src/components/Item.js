import React from "react";
import "./Item.model.css"

/**
 * Item component is created for displaying array values.
 * It takes style attributes which are related to item's value,
 */
class Item extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            top: props.style.top,
            bottom: props.style.bottom,
            left: props.style.left,
            right: props.style.right,
            height: props.style.height,
            width: props.style.width,
            bgcolor: props.style.bgcolor,

            value: props.value,
        }
    }

    componentDidUpdate(prevProps) {
        if (!(this.props.style.left === prevProps.style.left)) {
            this.setState({
                left: this.props.style.left,
            })
        }
        if (!(this.props.style.bgcolor === prevProps.style.bgcolor)) {
            this.setState({
                bgcolor: this.props.style.bgcolor,
            })
        }
        if (!(this.props.value === prevProps.value)) {
            this.setState({
                value: this.props.value,
            })
        }
        if (!(this.props.style.height === prevProps.style.height)) {
            this.setState({
                height: this.props.style.height,
            })
        }
        if (!(this.props.style.width === prevProps.style.width)) {
            this.setState({
                width: this.props.style.width,
            })
        }
    }

    render() {
        return (
            <div className="ItemWrapper"
                style={{
                    background: this.state.bgcolor,

                    height: `${this.state.height}%`,
                    width: `${this.state.width}%`,
                    left: `${this.state.left}%`,
                    top: `${this.state.top}%`,
                }}
            >
            </div>
        );
    }
}

export default Item;