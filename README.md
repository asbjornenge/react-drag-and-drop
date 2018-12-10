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
                onDrop={this.onDrop.bind(this)}>
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

## Changelog

### 3.0.0

* Support for React 16
* Updated most dev deps to latest

### 2.4.0

* Support for `wrapperComponent` prop where one can pass a component to be used instead of the standard components for `Draggable` and `Droppable` :tada: Thanks to @aaa707 for this one :rocket:

### 2.3.0

* Support for `enabled` prop for Droppable component

### 2.2.0

* Droppable now accepts `className` as prop - thanks @abdennour :tada:

### 2.1.0

* Support for React 15

### 2.0.2

* Support for enable prop in Draggable component

### 2.0.1

* Did a build (forgot for 2.0.0 release) :facepalm:

### 2.0.0

* Updated to remove warning for React v0.14

### 1.1.0

* Spreading this.props on both Draggable and Droppable

### 1.0.1

* Added FireFox support (DOMStringList -> Array)

### 1.0.0

* Initial release :tada:

enjoy
