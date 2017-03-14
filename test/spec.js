import testdom   from 'testdom'
import React     from 'react'
import ReactDOM  from 'react-dom';
import {mount, shallow} from 'enzyme';
import sinon     from 'sinon'
import TestUtils from 'react-addons-test-utils';
import expect    from 'expect';
import assert    from 'assert';
import nanodom   from 'nanodom'
import { Draggable, Droppable } from '../src/index'

testdom('<html><body><div id="app"></div></body></html>')

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
        ReactDOM.render(<App />, document.querySelector('#app'), done)
    })

    it('wraps droppable in a container', () => {
        let drop = nanodom('div').filter((div) => {
            return div.innerHTML == 'I am droppable'
        })
        assert(drop[0].parentNode.className == 'Droppable')
    })

    it(`appends "props className" with Droppable class`, () => {
       let anyOtherClass = "anyotherclass-something";
       const wrapper = mount(<Droppable className={anyOtherClass} />);
       expect(wrapper.find(`.Droppable.${anyOtherClass}`).length).toEqual(1);
    })

    it('wraps draggable in a container and marks it as draggable', () => {
        let drag = nanodom('div').filter((div) => {
            return div.innerHTML == 'I am draggable'
        })
        assert(drag[0].parentNode.getAttribute('draggable'))
    })

    // TODO: Add more and relevant tests

    it('supports disabling Droppable', () => {
      const onDrop = sinon.spy()
      const disabled = mount(<Droppable enabled={false} onDrop={onDrop} />)
      disabled.find('.Droppable').simulate('drop') 
      assert(!onDrop.calledOnce)
      const enabled = mount(<Droppable enabled={true} onDrop={onDrop} />)
      enabled.find('.Droppable').simulate('drop') 
      assert(onDrop.calledOnce)
    })

    it('supports disabling Draggable', () => {
      const enabled = mount(<Draggable enabled={true} />)
      assert(enabled.find('div').props('draggable').draggable)
      const disabled = mount(<Draggable enabled={false} />)
      assert(!disabled.find('div').props('draggable').draggable)
    })

    it('supports wrapper component for Droppable', () => {
      const onDrop = sinon.spy()
      const wrapper = mount(<Droppable wrapperComponent={<section />} onDrop={onDrop} />)
      wrapper.find('section.Droppable').simulate('drop')
      assert(onDrop.calledOnce)
    })

    it('supports wrapper component for Draggable', () => {
      const wrapper = mount(<Draggable wrapperComponent={<span />} />)
      assert(wrapper.find('span').props('draggable').draggable)
    })

})
