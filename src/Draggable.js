import React from 'react'

export default class Draggable extends React.Component {
    render() {
        return (
            <div draggable="true" {...this.props}
                    onDragEnd={this.onDragEnd.bind(this)}
                    onDragStart={this.onDragStart.bind(this)}> 
                {this.props.children}
            </div>
        )
    }
    onDragStart(e) {
        if (typeof this.props.onDragStart === 'function') this.props.onDragStart(e)
        e.dataTransfer.setData(this.props.type,this.props.data)
    }
    onDragEnd(e) {
        if (typeof this.props.onDragEnd === 'function') this.props.onDragEnd(e)
    }
}
