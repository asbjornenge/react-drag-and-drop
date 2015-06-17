import React     from 'react'
import Draggable from './src/Draggable'
import Droppable from './src/Droppable'

class Demo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            draggable : ['drag','us','plz'],
            dropped   : '',
            hovering  : false
        }
    }
    render() {
        let draggable = this.state.draggable.map((title, index) => {
            return (
                <li key={title}>
                    <Draggable type="yolo" data={title}>{title}</Draggable>
                </li>
            )
        })
        let droppableStyle = {
            height : '200px'
        }
        if (this.state.hovering) droppableStyle.backgroundColor = 'pink'
        return (
            <div>
                <ul>{draggable}</ul>
                <div style={{border:'1px solid red', width:'200px',height:'200px', position:'relative'}}>
                    <span style={{position:'absolute',float:'left'}}>Drop zone...</span>
                    <Droppable 
                        types={['yolo']} 
                        style={droppableStyle} 
                        onDrop={this.onDrop.bind(this)}
                        onDragEnter={this.onDragEnter.bind(this)}
                        onDragLeave={this.onDragLeave.bind(this)}>
                        <div style={{textAlign:'center', lineHeight:'100px'}}>{this.state.dropped}</div>
                    </Droppable>
                </div>
            </div>
        )
    }
    onDragEnter() {
        this.setState({ hovering : true })
    }
    onDragLeave() {
        this.setState({ hovering : false })
    }
    onDrop(e) {
        this.setState({ hovering : false, dropped : e.yolo })
        clearTimeout(this.dropTimeout)
        this.dropTimeout = setTimeout(() => {
            this.setState({ dropped : '' })
        },1500)
    }
}

React.render(<Demo />, document.body)
