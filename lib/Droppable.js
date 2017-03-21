"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = _interopRequire(require("react"));

var utils = _interopRequire(require("./utils"));

function pickTypes(e) {
    return e.dataTransfer ? e.dataTransfer.types : [];
}

function filterProps(props) {
    var forbidden = ["types", "className", "enabled", "wrapperComponent"];
    return Object.keys(props).reduce(function (p, c) {
        if (!forbidden.includes(c)) {
            p[c] = props[c];
        }
        return p;
    }, {});
}

var Droppable = (function (_React$Component) {
    function Droppable(props) {
        _classCallCheck(this, Droppable);

        _get(Object.getPrototypeOf(Droppable.prototype), "constructor", this).call(this, props);
        this.state = {
            over: false
        };
    }

    _inherits(Droppable, _React$Component);

    _createClass(Droppable, {
        render: {
            value: function render() {
                var Tag = "div";
                var props = Object.assign({}, this.props);
                if (this.props.wrapperComponent) {
                    Tag = this.props.wrapperComponent.type;
                    props = Object.assign(props, this.props.wrapperComponent.props);
                }
                var classes = "Droppable";
                if (props.className) classes += " " + props.className;
                if (this.state.over) classes += " over";
                return React.createElement(
                    Tag,
                    _extends({ ref: "droppable", className: classes }, filterProps(props), {
                        onDrop: this.onDrop.bind(this),
                        onDragOver: this.onDragOver.bind(this),
                        onDragEnter: this.onDragEnter.bind(this),
                        onDragLeave: this.onDragLeave.bind(this),
                        onDragExit: this.onDragLeave.bind(this) }),
                    props.children
                );
            }
        },
        onDragOver: {
            value: function onDragOver(e) {
                e.preventDefault();
                if (!this.allowed(pickTypes(e))) {
                    return;
                }if (typeof this.props.onDragOver === "function") this.props.onDragOver(e);
            }
        },
        onDragEnter: {
            value: function onDragEnter(e) {
                e.preventDefault();
                if (this.state.over) {
                    return;
                }if (!this.allowed(pickTypes(e))) {
                    return;
                }if (typeof this.props.onDragEnter === "function") this.props.onDragEnter(e);
                this.setState({ over: true });
            }
        },
        onDragLeave: {
            value: function onDragLeave(e) {
                e.preventDefault();
                if (!this.allowed(pickTypes(e))) {
                    return;
                }var over = true;
                if (e.clientX <= this.position.left || e.clientX >= this.position.right) over = false;
                if (e.clientY <= this.position.top || e.clientY >= this.position.bottom) over = false;
                if (over) {
                    return;
                }this.setState({ over: false });
                if (typeof this.props.onDragLeave === "function") this.props.onDragLeave(e);
            }
        },
        onDrop: {
            value: function onDrop(e) {
                e.preventDefault();
                if (!this.allowed(pickTypes(e))) {
                    return;
                }this.setState({ over: false });
                var props = Object.assign({}, this.props);
                if (this.props.wrapperComponent) props = Object.assign(props, this.props.wrapperComponent.props);
                var data = !props.types ? null : [].concat(props.types).reduce(function (d, type) {
                    d[type] = e.dataTransfer.getData(type);
                    return d;
                }, {});
                if (typeof this.props.onDrop === "function") this.props.onDrop(data, e);
            }
        },
        allowed: {
            value: function allowed(attemptingTypes) {
                var props = Object.assign({}, this.props);
                if (this.props.wrapperComponent) props = Object.assign(props, this.props.wrapperComponent.props);
                if (!props.enabled) {
                    return false;
                }var _attemptingTypes = utils.toArray(attemptingTypes);
                if (!props.types) {
                    return true;
                }return [].concat(props.types).reduce(function (sum, type) {
                    if (_attemptingTypes.indexOf(type) >= 0) return true;
                    return sum;
                }, false);
            }
        },
        componentDidMount: {
            value: function componentDidMount() {
                // TODO: Listen for window resize?
                var node = this.refs.droppable;
                this.position = {
                    top: node.offsetTop + 5,
                    left: node.offsetLeft + 5,
                    right: node.offsetLeft + node.offsetWidth - 5,
                    bottom: node.offsetTop + node.offsetHeight - 5
                };
            }
        }
    });

    return Droppable;
})(React.Component);

module.exports = Droppable;

Droppable.defaultProps = {
    enabled: true
};