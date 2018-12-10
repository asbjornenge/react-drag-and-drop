import React     from 'react'
import ReactDOM  from 'react-dom'
import Draggable from './src/Draggable'
import Droppable from './src/Droppable'

class Demo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            draggable : ['drag','us','plz','but-not-me'],
            dropped   : '',
            hovering  : false
        }
    }
    render() {
        let draggable = this.state.draggable.map((title, index) => {
            return (
                <li key={title}>
                    <Draggable enabled={index < 3} type="yolo" data={title}>{title}</Draggable>
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
                    <span style={{position:'absolute',float:'left'}}>Drop here...</span>
                    <Droppable 
                        types={['yolo']} 
                        style={droppableStyle} 
                        onDrop={this.onDrop.bind(this)}
                        onDragEnter={this.onDragEnter.bind(this)}
                        onDragLeave={this.onDragLeave.bind(this)}>
                        <div style={{textAlign:'center', lineHeight:'100px'}}>{this.state.dropped}</div>
                    </Droppable>
                </div>
                <div style={{border:'1px solid red', width:'200px',height:'200px', position:'relative'}}>
                    <span style={{position:'absolute',float:'left'}}>But not here...</span>
                    <Droppable
                        enabled={false}
                        style={{height: '200px'}} 
                        types={['yolo']} 
                        onDrop={this.onDrop.bind(this)}>
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

const app = document.createElement('div')
document.body.append(app)

ReactDOM.render(<Demo />, app)
