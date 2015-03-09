import testdom   from 'testdom'
import React     from 'react/addons'
import assert    from 'assert'
import nanodom   from 'nanodom'
import { Draggable, Droppable } from '../index'

let TestUtils = React.addons.TestUtils
testdom('<html><body></body></html>')

class App extends React.Component {
    render() {
        return (
            <div>
                <Draggable>
                    <div>I am draggable</div>
                </Draggable>
                <Droppable>
                    <div>I am droppable</div>
                </Droppable>
            </div>
        )
    }
}

describe('drag-and-drop', () => {

    before((done) => {
        React.render(<App />, document.body, done) 
    })

    it('wraps droppable in a container', () => {
        let drop = nanodom('div').filter((div) => {
            return div.innerHTML == 'I am droppable'
        })
        assert(drop[0].parentNode.className == 'Droppable')
    })

    it('wraps draggable in a container and marks it as draggable', () => {
        let drag = nanodom('div').filter((div) => {
            return div.innerHTML == 'I am draggable'
        })
        assert(drag[0].parentNode.getAttribute('draggable'))
    })

    // TODO: Add more and relevat tests

})


