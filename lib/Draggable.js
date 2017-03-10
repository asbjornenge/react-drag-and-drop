"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var React = _interopRequire(require("react"));

var Draggable = (function (_React$Component) {
    function Draggable() {
        _classCallCheck(this, Draggable);

        if (_React$Component != null) {
            _React$Component.apply(this, arguments);
        }
    }

    _inherits(Draggable, _React$Component);

    _createClass(Draggable, {
        render: {
            value: function render() {
                var props = Object.assign({}, this.props);
                if (this.props.enabled) {
                    props.draggable = "true";
                    props.onDragEnd = this.onDragEnd.bind(this);
                    props.onDragStart = this.onDragStart.bind(this);
                }
                delete props.enabled;
                var DraggableTag = "" + props.tag;
                delete props.tag;
                return React.createElement(
                    DraggableTag,
                    props,
                    this.props.children
                );
            }
        },
        onDragStart: {
            value: function onDragStart(e) {
                if (typeof this.props.onDragStart === "function") this.props.onDragStart(e);
                e.dataTransfer.setData(this.props.type, this.props.data);
            }
        },
        onDragEnd: {
            value: function onDragEnd(e) {
                if (typeof this.props.onDragEnd === "function") this.props.onDragEnd(e);
            }
        }
    });

    return Draggable;
})(React.Component);

module.exports = Draggable;

Draggable.defaultProps = {
    enabled: true,
    tag: "div"
};