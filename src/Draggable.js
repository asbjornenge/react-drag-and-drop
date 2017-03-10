import React from 'react'

export default class Draggable extends React.Component {
    render() {
        let props = Object.assign({}, this.props)
        if (this.props.enabled) {
            props.draggable   = 'true'
            props.onDragEnd   = this.onDragEnd.bind(this)
            props.onDragStart = this.onDragStart.bind(this)
        }
        delete props.enabled
        const DraggableTag = `${props.tag}`
        delete props.tag
        return (
            <DraggableTag {...props}>
                {this.props.children}
            </DraggableTag>
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

Draggable.defaultProps = {
    enabled: true,
    tag: 'div'
}
