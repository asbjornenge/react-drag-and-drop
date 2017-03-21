import React from 'react'

export default class Draggable extends React.Component {
    render() {
        let Tag   = 'div'
        let props = Object.assign({}, this.props)
        if (this.props.wrapperComponent) {
            Tag   = this.props.wrapperComponent.type
            props = Object.assign(props, this.props.wrapperComponent.props)
            delete props.wrapperComponent
        }
        if (this.props.enabled) {
            props.draggable   = 'true'
            props.onDragEnd   = this.onDragEnd.bind(this)
            props.onDragStart = this.onDragStart.bind(this)
        }
        delete props.enabled
        return (
            <Tag {...props}>
                {props.children}
            </Tag>
        )
    }
    onDragStart(e) {
        if (typeof this.props.onDragStart === 'function') this.props.onDragStart(e)
        let props = Object.assign({}, this.props)
        if (this.props.wrapperComponent) props = Object.assign(props, this.props.wrapperComponent.props)
        e.dataTransfer.setData(props.type, props.data)
    }
    onDragEnd(e) {
        if (typeof this.props.onDragEnd === 'function') this.props.onDragEnd(e)
    }
}

Draggable.defaultProps = {
    enabled: true
}
