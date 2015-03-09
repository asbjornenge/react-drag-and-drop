# React Drag and Drop

This library contains some very basic draggable and droppable components.

You probably want to use something more stable and feature rich like [react-dnd](https://github.com/gaearon/react-dnd).

## Install

```sh
npm install react-drag-and-drop
```

### Use

```js
import { Draggable, Droppable } from 'react-drag-and-drop'

class App extends React.Component {
    render() {
        <div>
            <ul>
                <Draggable type="fruit" data="banana"><li>Banana</li></Draggable>
                <Draggable type="fruit" data="apple"><li>Apple</li></Draggable>
                <Draggable type="metal" data="silver"><li>Silver</li></Draggable>
            </ul>
            <Droppable
                types={['fruit']} // <= allowed drop types
                onDrop={this.onDrop.bind(this)}
                <ul className="Smoothie"></ul>
            </Droppable>
        </div>
    }
    onDrop(data) {
        console.log(data)
        // => banana 
    }
}
```

So the idea is that you wrap your components in *Draggable* and *Droppable* containers (instead of using mixins), define *types* and *data* to carry. You can also hook into the different drag events to create more funk. The best way (for now) to figure out how is to peak inside the <code>src</code> directory. The implementation is quite minimal.

enjoy
