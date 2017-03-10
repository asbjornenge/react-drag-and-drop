import React from 'react'
import utils from './utils'

function pickTypes(e) {
  return e.dataTransfer ? e.dataTransfer.types : []
}

function filterProps(props) {
  const forbidden = ['types', 'className', 'enabled', 'tag']
  return Object.keys(props).reduce((p, c) => {
    if (!forbidden.includes(c)) {
      p[c] = props[c]
    }
    return p
  }, {})
}

export default class Droppable extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            over : false
        }
    }
    render() {
        let props = Object.assign({}, this.props)
        let classes = 'Droppable';
        if(props.className) classes+=` ${props.className}`;
        if (this.state.over) classes+=' over';
        const DroppableTag = `${props.tag}`
        return (
            <DroppableTag ref="droppable" className={classes} {...filterProps(props)}
                    onDrop={this.onDrop.bind(this)}
                    onDragOver={this.onDragOver.bind(this)}
                    onDragEnter={this.onDragEnter.bind(this)}
                    onDragLeave={this.onDragLeave.bind(this)}
                    onDragExit={this.onDragLeave.bind(this)}>
                {this.props.children}
            </DroppableTag>
        )
    }
    onDragOver(e) {
        e.preventDefault()
        if (!this.allowed(pickTypes(e))) return
        if (typeof this.props.onDragOver === 'function') this.props.onDragOver(e)
    }
    onDragEnter(e) {
        e.preventDefault()
        if (this.state.over) return
        if (!this.allowed(pickTypes(e))) return
        if (typeof this.props.onDragEnter === 'function') this.props.onDragEnter(e)
        this.setState({ over : true })
    }
    onDragLeave(e) {
        e.preventDefault()
        if (!this.allowed(pickTypes(e))) return
        let over = true
        if (e.clientX <= this.position.left || e.clientX >= this.position.right)  over = false
        if (e.clientY <= this.position.top  || e.clientY >= this.position.bottom) over = false
        if (over) return
        this.setState({ over : false })
        if (typeof this.props.onDragLeave === 'function') this.props.onDragLeave(e)
    }
    onDrop(e) {
        e.preventDefault()
        if (!this.allowed(pickTypes(e))) return
        this.setState({ over : false })
        var data = !this.props.types ? null : [].concat(this.props.types).reduce((d, type) => {
            d[type] = e.dataTransfer.getData(type)
            return d
        },{})
        if (typeof this.props.onDrop === 'function') this.props.onDrop(data, e)
    }
    allowed(attemptingTypes) {
        if (!this.props.enabled) return false
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

Droppable.defaultProps = {
    enabled: true,
    tag: 'div'
}
