import React from 'react'
import utils from './utils'

function pickTypes(e) {
  return e.dataTransfer ? e.dataTransfer.types : []
}

function filterProps(props) {
  let forbidden = ['types', 'className', 'enabled', 'wrapperComponent']
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
        let Tag   = 'div'
        let props = Object.assign({}, this.props)
        if (this.props.wrapperComponent) {
            Tag   = this.props.wrapperComponent.type
            props = Object.assign(props, this.props.wrapperComponent.props)
        }
        let classes = 'Droppable';
        if(props.className) classes+=` ${props.className}`;
        if (this.state.over) classes+=' over';
        return (
            <Tag ref="droppable" className={classes} {...filterProps(props)}
                    onDrop={this.onDrop.bind(this)}
                    onDragOver={this.onDragOver.bind(this)}
                    onDragEnter={this.onDragEnter.bind(this)}
                    onDragLeave={this.onDragLeave.bind(this)}
                    onDragExit={this.onDragLeave.bind(this)}>
                {props.children}
            </Tag>
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
        let props = Object.assign({}, this.props)
        if (this.props.wrapperComponent) props = Object.assign(props, this.props.wrapperComponent.props)
        const data = !props.types ? null : [].concat(props.types).reduce((d, type) => {
            d[type] = e.dataTransfer.getData(type)
            return d
        },{})
        if (typeof this.props.onDrop === 'function') this.props.onDrop(data, e)
    }
    allowed(attemptingTypes) {
        let props = Object.assign({}, this.props)
        if (this.props.wrapperComponent) props = Object.assign(props, this.props.wrapperComponent.props)
        if (!props.enabled) return false
        let _attemptingTypes = utils.toArray(attemptingTypes)
        if (!props.types) return true
        return [].concat(props.types).reduce((sum, type) => {
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
    enabled: true
}
