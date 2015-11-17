import React from 'react'
import utils from './utils'

export default class Droppable extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            over : false
        }
    }
    render() {
        var classes = 'Droppable'
        if (this.state.over) classes+=' over'
        return (
            <div ref="droppable" className={classes} {...this.props}
                    onDrop={this.onDrop.bind(this)}
                    onDragOver={this.onDragOver.bind(this)}
                    onDragEnter={this.onDragEnter.bind(this)}
                    onDragLeave={this.onDragLeave.bind(this)}
                    onDragExit={this.onDragLeave.bind(this)}>
                {this.props.children}
            </div>
        )
    }
    onDragOver(e) {
        e.preventDefault()
        if (!this.allowed(e.dataTransfer.types)) return
        if (typeof this.props.onDragOver === 'function') this.props.onDragOver(e)
    }
    onDragEnter(e) {
        e.preventDefault()
        if (this.state.over) return
        if (!this.allowed(e.dataTransfer.types)) return
        if (typeof this.props.onDragEnter === 'function') this.props.onDragEnter(e)
        this.setState({ over : true })
    }
    onDragLeave(e) {
        e.preventDefault()
        if (!this.allowed(e.dataTransfer.types)) return
        let over = true
        if (e.clientX <= this.position.left || e.clientX >= this.position.right)  over = false
        if (e.clientY <= this.position.top  || e.clientY >= this.position.bottom) over = false 
        if (over) return
        this.setState({ over : false })
        if (typeof this.props.onDragLeave === 'function') this.props.onDragLeave(e)
    }
    onDrop(e) {
        e.preventDefault()
        if (!this.allowed(e.dataTransfer.types)) return
        this.setState({ over : false })
        var data = !this.props.types ? null : [].concat(this.props.types).reduce((d, type) => {
            d[type] = e.dataTransfer.getData(type)
            return d
        },{})
        if (typeof this.props.onDrop === 'function') this.props.onDrop(data, e)
    }
    allowed(attemptingTypes) {
        let _attemptingTypes = utils.toArray(attemptingTypes)
        if (!this.props.types) return true
        return [].concat(this.props.types).reduce((sum, type) => {
            if (_attemptingTypes.indexOf(type) >= 0) return true
            return sum
        }, false)
    }
    componentDidMount() {
        // TODO: Listen for window resize?
        var node  = this.refs.droppable;
        this.position = {
            top    : node.offsetTop+5,
            left   : node.offsetLeft+5,
            right  : node.offsetLeft+node.offsetWidth-5,
            bottom : node.offsetTop+node.offsetHeight-5
        }
    }
}

