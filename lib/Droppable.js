"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _utils = _interopRequireDefault(require("./utils"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function pickTypes(e) {
  return e.dataTransfer ? e.dataTransfer.types : [];
}

function filterProps(props) {
  var forbidden = ['types', 'className', 'enabled', 'wrapperComponent'];
  return Object.keys(props).reduce(function (p, c) {
    if (!forbidden.includes(c)) {
      p[c] = props[c];
    }

    return p;
  }, {});
}

var Droppable =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Droppable, _React$Component);

  function Droppable(props) {
    var _this;

    _classCallCheck(this, Droppable);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Droppable).call(this, props));
    _this.state = {
      over: false
    };
    _this.droppable = _react.default.createRef();
    return _this;
  }

  _createClass(Droppable, [{
    key: "render",
    value: function render() {
      var Tag = 'div';
      var props = Object.assign({}, this.props);

      if (this.props.wrapperComponent) {
        Tag = this.props.wrapperComponent.type;
        props = Object.assign(props, this.props.wrapperComponent.props);
      }

      var classes = 'Droppable';
      if (props.className) classes += " ".concat(props.className);
      if (this.state.over) classes += ' over';
      return _react.default.createElement(Tag, _extends({
        ref: this.droppable,
        className: classes
      }, filterProps(props), {
        onDrop: this.onDrop.bind(this),
        onDragOver: this.onDragOver.bind(this),
        onDragEnter: this.onDragEnter.bind(this),
        onDragLeave: this.onDragLeave.bind(this),
        onDragExit: this.onDragLeave.bind(this)
      }), props.children);
    }
  }, {
    key: "onDragOver",
    value: function onDragOver(e) {
      e.preventDefault();
      if (!this.allowed(pickTypes(e))) return;
      if (typeof this.props.onDragOver === 'function') this.props.onDragOver(e);
    }
  }, {
    key: "onDragEnter",
    value: function onDragEnter(e) {
      e.preventDefault();
      if (this.state.over) return;
      if (!this.allowed(pickTypes(e))) return;
      if (typeof this.props.onDragEnter === 'function') this.props.onDragEnter(e);
      this.setState({
        over: true
      });
    }
  }, {
    key: "onDragLeave",
    value: function onDragLeave(e) {
      e.preventDefault();
      if (!this.allowed(pickTypes(e))) return;
      var over = true;
      if (e.clientX <= this.position.left || e.clientX >= this.position.right) over = false;
      if (e.clientY <= this.position.top || e.clientY >= this.position.bottom) over = false;
      if (over) return;
      this.setState({
        over: false
      });
      if (typeof this.props.onDragLeave === 'function') this.props.onDragLeave(e);
    }
  }, {
    key: "onDrop",
    value: function onDrop(e) {
      e.preventDefault();
      if (!this.allowed(pickTypes(e))) return;
      this.setState({
        over: false
      });
      var props = Object.assign({}, this.props);
      if (this.props.wrapperComponent) props = Object.assign(props, this.props.wrapperComponent.props);
      var data = !props.types ? null : [].concat(props.types).reduce(function (d, type) {
        d[type] = e.dataTransfer.getData(type);
        return d;
      }, {});
      if (typeof this.props.onDrop === 'function') this.props.onDrop(data, e);
    }
  }, {
    key: "allowed",
    value: function allowed(attemptingTypes) {
      var props = Object.assign({}, this.props);
      if (this.props.wrapperComponent) props = Object.assign(props, this.props.wrapperComponent.props);
      if (!props.enabled) return false;

      var _attemptingTypes = _utils.default.toArray(attemptingTypes);

      if (!props.types) return true;
      return [].concat(props.types).reduce(function (sum, type) {
        if (_attemptingTypes.indexOf(type) >= 0) return true;
        return sum;
      }, false);
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      // TODO: Listen for window resize?
      var node = this.droppable.current;
      this.position = {
        top: node.offsetTop + 5,
        left: node.offsetLeft + 5,
        right: node.offsetLeft + node.offsetWidth - 5,
        bottom: node.offsetTop + node.offsetHeight - 5
      };
    }
  }]);

  return Droppable;
}(_react.default.Component);

exports.default = Droppable;
Droppable.defaultProps = {
  enabled: true
};