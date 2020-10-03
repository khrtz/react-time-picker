(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("React"));
	else if(typeof define === 'function' && define.amd)
		define(["React"], factory);
	else if(typeof exports === 'object')
		exports["ReactTimePicker"] = factory(require("React"));
	else
		root["ReactTimePicker"] = factory(root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _objectAssign = __webpack_require__(2);

	var _objectAssign2 = _interopRequireDefault(_objectAssign);

	var _reactStyleNormalizer = __webpack_require__(3);

	var _reactStyleNormalizer2 = _interopRequireDefault(_reactStyleNormalizer);

	var _parseTime = __webpack_require__(15);

	var _parseTime2 = _interopRequireDefault(_parseTime);

	var _updateTime2 = __webpack_require__(28);

	var _updateTime3 = _interopRequireDefault(_updateTime2);

	var _toUpperFirst = __webpack_require__(29);

	var _toUpperFirst2 = _interopRequireDefault(_toUpperFirst);

	var _hasTouch = __webpack_require__(30);

	var _hasTouch2 = _interopRequireDefault(_hasTouch);

	var _reactEventNames = __webpack_require__(31);

	var _reactEventNames2 = _interopRequireDefault(_reactEventNames);

	var _twoDigits = __webpack_require__(32);

	var _twoDigits2 = _interopRequireDefault(_twoDigits);

	var _getFormatInfo = __webpack_require__(33);

	var _getFormatInfo2 = _interopRequireDefault(_getFormatInfo);

	var _format2 = __webpack_require__(34);

	var _format3 = _interopRequireDefault(_format2);

	var _formatTime = __webpack_require__(35);

	var _formatTime2 = _interopRequireDefault(_formatTime);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function identity(v) {
		return v;
	}
	function emptyFn() {}

	var WHITESPACE = '\xA0';

	var TimePicker = function (_React$Component) {
		_inherits(TimePicker, _React$Component);

		function TimePicker(props) {
			_classCallCheck(this, TimePicker);

			var _this = _possibleConstructorReturn(this, (TimePicker.__proto__ || Object.getPrototypeOf(TimePicker)).call(this, props));

			_this.state = {
				defaultValue: _this.props.defaultValue,
				focused: {
					hour: null,
					minute: null,
					second: null,
					meridian: null
				},
				overArrow: {
					hour: null,
					minute: null,
					second: null,
					meridian: null
				}
			};
			return _this;
		}

		_createClass(TimePicker, [{
			key: 'componentWillUnmount',
			value: function componentWillUnmount() {
				this.stopInterval();
			}
		}, {
			key: 'normalize',
			value: function normalize(style) {
				return (0, _reactStyleNormalizer2.default)(style);
			}
		}, {
			key: 'render',
			value: function render() {
				var props = this.prepareProps(this.props, this.state);

				if (!props.normalizeStyle) {
					this.normalize = identity;
				}

				var hour = this.renderHour(props);
				var minute = this.renderMinute(props);
				var second = this.renderSecond(props);
				var meridian = this.renderMeridian(props);

				var separator = props.separator || _react2.default.createElement(
					'span',
					{ style: props.separatorStyle },
					WHITESPACE + ':' + WHITESPACE
				);
				var hourSeparator = hour && (minute || second || meridian) ? props.hourSeparator || separator : null;
				var minuteSeparator = minute && (second || meridian) ? props.minuteSeparator || separator : null;
				var secondSeparator = second && meridian ? props.secondSeparator || separator : null;

				return _react2.default.createElement(
					'div',
					props,
					hour,
					hourSeparator,
					minute,
					minuteSeparator,
					second,
					secondSeparator,
					meridian
				);
			}
		}, {
			key: 'onArrowMouseEnter',
			value: function onArrowMouseEnter(props, dir, name, event) {
				var overArrow = this.state.overArrow;
				this.isMouseEnter = true;

				Object.keys(overArrow).forEach(function (key) {
					overArrow[key] = null;
				});

				overArrow[name] = dir;

				this.setState({});
			}
		}, {
			key: 'onArrowMouseLeave',
			value: function onArrowMouseLeave(props, dir, name, event) {
				this.isMouseEnter = false;
				this.state.overArrow[name] = null;

				this.setState({});
			}
		}, {
			key: 'onArrowMouseDown',
			value: function onArrowMouseDown(props, dir, name, event) {
				// Fixed though there was a bat when right-clicked long pressed.
				if (event.button === 2 || event.shiftKey || event.altkey || event.ctrlKey) {
					return;
				}

				if (name === 'meridian') {
					this.onArrowMeridianAction(props, dir, name);
					return;
				}

				var target = _hasTouch2.default ? event.target : window;
				var eventName = _hasTouch2.default ? 'touchend' : 'click';

				target.addEventListener(eventName, this.onWindowClick.bind(this));

				this.onArrowAction(props, dir, name);

				this.timeoutId = setTimeout(function () {
					this.startInterval(props, dir, name);
				}.bind(this), props.stepDelay);
			}
		}, {
			key: 'onWindowClick',
			value: function onWindowClick() {
				this.stopInterval();
			}
		}, {
			key: 'stopInterval',
			value: function stopInterval() {
				clearTimeout(this.timeoutId);
				clearInterval(this.intervalId);
			}
		}, {
			key: 'startInterval',
			value: function startInterval(props, dir, name) {
				this.intervalId = setInterval(function () {
					this.onArrowAction(props, dir, name);
				}.bind(this), props.stepDelay);
			}
		}, {
			key: 'onMeridianInputMouseDown',
			value: function onMeridianInputMouseDown(props, event) {
				event.preventDefault();
				this.onArrowMeridianAction(props, 1, 'meridian');
			}
		}, {
			key: 'onArrowMeridianAction',
			value: function onArrowMeridianAction(props, dir, name) {
				var currentMeridian = this.time.meridian;
				var lowercase = currentMeridian == 'am' || currentMeridian == 'pm';

				var newValue = lowercase ? currentMeridian == 'am' ? 'pm' : 'am' : currentMeridian == 'AM' ? 'PM' : 'AM';

				this.updateValue(name, newValue);
			}
		}, {
			key: 'onArrowAction',
			value: function onArrowAction(props, dir, name) {
				// Ignored if the mouse is out of the arrow button.
				if (!this.isMouseEnter) {
					return;
				}
				var dirName = dir == 1 ? 'Up' : 'Down';
				var methodName = 'onArrow' + dirName + (0, _toUpperFirst2.default)(name) + 'Action';

				if (typeof this[methodName] == 'function') {
					this[methodName](props);
				}

				methodName = 'onArrow' + (0, _toUpperFirst2.default)(name) + 'Action';

				if (typeof this[methodName] == 'function') {
					this[methodName](props, dir);
				}

				this.incValue(props, name, dir);
			}
		}, {
			key: 'incValue',
			value: function incValue(props, name, dir) {
				dir = dir || 0;

				var step = props[name + 'Step'] || props.step;
				var amount = dir * step;
				var time = this.time;
				var oldValue = time[name];
				var newValue = oldValue + amount;

				// this.setValue(time)
				this.updateValue(name, newValue);
			}
		}, {
			key: 'updateValue',
			value: function updateValue(name, newValue, config) {
				this.setValue(this.updateTime(name, newValue, config));
			}
		}, {
			key: 'updateTime',
			value: function updateTime(name, newValue, config) {
				config = config || {};
				config.overflowHourToMeridian = this.props.overflowHourToMeridian;

				var time = this.time;

				time = (0, _updateTime3.default)(time, name, newValue, config);

				return this.time = time;
			}
		}, {
			key: 'setValue',
			value: function setValue(time) {
				if (this.props.value == null) {
					this.setState({
						defaultValue: time
					});
				}

				;(this.props.onChange || emptyFn)(this.props.timeToString(time, this.props.format), (0, _objectAssign2.default)({}, time));
			}
		}, {
			key: 'format',
			value: function format(props, name, value) {
				var renderFn = void 0;

				if (arguments.length < 3) {
					value = props.time[name];
				}

				if (name != 'meridian') {
					renderFn = props['render' + (0, _toUpperFirst2.default)(name)];
				} else {
					renderFn = props.renderMeridian;
				}

				if (!renderFn && typeof props.format == 'string') {
					var formatInfo = this.formatInfo;
					renderFn = function renderFn(value, name) {
						return (0, _format3.default)(name, value, formatInfo);
					};
				}

				if (!renderFn) {
					renderFn = _twoDigits2.default;
				}

				if (typeof renderFn == 'function') {
					value = renderFn(value, name, props);
				}

				return value;
			}
		}, {
			key: 'renderBox',
			value: function renderBox(props, name) {
				var state = this.state;
				var style = props[name + 'Style'];
				var inputStyle = props[name + 'InputStyle'];
				var upperName = (0, _toUpperFirst2.default)(name);

				var value = void 0;
				if (!state.focused[name]) {
					value = this.format(props, name);
				} else {
					value = state.focused[name].value;
				}

				var arrowUp = void 0;
				var arrowDown = void 0;

				if (props.showArrows) {
					var overArrow = this.state.overArrow[name];

					var arrowUpStyle = props.arrowUpStyle;

					if (overArrow == 1) {
						arrowUpStyle = (0, _objectAssign2.default)({}, props.arrowUpStyle, props.defaultArrowOverStyle, props.defaultArrowUpOverStyle, props.arrowOverStyle, props.arrowUpOverStyle);
					}

					var arrowUpProps = {
						mouseOver: overArrow == 1,
						style: arrowUpStyle,
						children: '▲'
					};

					arrowUpProps[_reactEventNames2.default.onMouseDown] = this.onArrowMouseDown.bind(this, props, 1, name);
					arrowUpProps.onMouseEnter = this.onArrowMouseEnter.bind(this, props, 1, name);
					arrowUpProps.onMouseLeave = this.onArrowMouseLeave.bind(this, props, 1, name);

					var arrowDownStyle = props.arrowDownStyle;

					if (overArrow == -1) {
						arrowDownStyle = (0, _objectAssign2.default)({}, props.arrowDownStyle, props.defaultArrowOverStyle, props.defaultArrowDownOverStyle, props.arrowOverStyle, props.arrowDownOverStyle);
					}

					var arrowDownProps = {
						mouseOver: overArrow == -1,
						style: arrowDownStyle,
						children: '▼'
					};

					arrowDownProps[_reactEventNames2.default.onMouseDown] = this.onArrowMouseDown.bind(this, props, -1, name);
					arrowDownProps.onMouseEnter = this.onArrowMouseEnter.bind(this, props, -1, name);
					arrowDownProps.onMouseLeave = this.onArrowMouseLeave.bind(this, props, -1, name);

					var defaultArrowFactory = props.defaultArrowFactory;
					var arrowUpFactory = props.arrowUpFactory || props.arrowFactory || defaultArrowFactory;
					var arrowDownFactory = props.arrowDownFactory || props.arrowFactory || defaultArrowFactory;

					arrowUp = arrowUpFactory(arrowUpProps);

					if (arrowUp === undefined) {
						arrowUp = defaultArrowFactory(arrowUpProps);
					}

					arrowDown = arrowDownFactory(arrowDownProps);
					if (arrowDown === undefined) {
						arrowDown = defaultArrowFactory(arrowDownProps);
					}
				}

				var defaultInputFactory = props.defaultInputFactory;
				var inputFactory = props[name + 'InputFactory'] || props.inputFactory || defaultInputFactory;

				var defaultInputProps = props['default' + upperName + 'InputProps'];
				var inputProps = props[name + 'InputProps'];

				inputProps = (0, _objectAssign2.default)({}, props.inputProps, defaultInputProps, inputProps, {
					timeName: name,
					style: inputStyle,
					value: value,
					onBlur: this.handleInputBlur.bind(this, props, name),
					onChange: this.handleInputChange.bind(this, props, name),
					onFocus: this.handleInputFocus.bind(this, props, name),
					onKeyUp: this.handleInputKeyUp.bind(this, props, name)
				});

				if (name == 'meridian') {
					inputProps.onMouseDown = this.onMeridianInputMouseDown.bind(this, props);
				}

				var input = inputFactory(inputProps);

				if (input === undefined) {
					input = defaultInputFactory(inputProps);
				}

				return _react2.default.createElement(
					'div',
					{ style: style },
					arrowUp,
					input,
					arrowDown
				);
			}
		}, {
			key: 'handleInputFocus',
			value: function handleInputFocus(props, name, event) {
				var focused = this.state.focused;

				focused[name] = {
					value: this.format(props, name)
				};

				this.stopInterval();

				this.setState({});
			}
		}, {
			key: 'handleInputBlur',
			value: function handleInputBlur(props, name, event) {

				this.state.focused[name] = null;
				this.setState({});

				var time = void 0;
				var value = event.target.value * 1;

				this.updateValue(name, value, {
					clamp: props.clamp
				});
			}
		}, {
			key: 'handleInputChange',
			value: function handleInputChange(props, name, event) {
				if (this.state.focused[name]) {
					this.state.focused[name].value = event.target.value;
				}

				this.setState({});
				props.stopChangePropagation && event.stopPropagation();
			}
		}, {
			key: 'handleInputKeyUp',
			value: function handleInputKeyUp(props, name, event) {
				if (event.key === 'ArrowDown') {
					this.incValue(props, name, -1);
				}
				if (event.key === 'ArrowUp') {
					this.incValue(props, name, 1);
				}
				this.setState({ focused: {} });
			}
		}, {
			key: 'getTime',
			value: function getTime() {
				var strict = this.props.strict;
				var formatInfo = this.formatInfo = (0, _getFormatInfo2.default)(this.props.format);

				return (0, _parseTime2.default)(this.getValue(), {
					strict: strict,

					hour: formatInfo.hour,
					minute: formatInfo.minute,
					second: formatInfo.second,
					meridian: formatInfo.meridian
				});
			}
		}, {
			key: 'prepareTime',
			value: function prepareTime(props, state) {
				var timeValue = this.getTime();
				var formatInfo = this.props.format ? this.formatInfo : null;

				props.showSecond = formatInfo ? formatInfo.second.specified : timeValue.second !== undefined;

				props.showMinute = formatInfo ? formatInfo.minute.specified : timeValue.minute !== undefined;

				props.withMeridian = formatInfo ? formatInfo.meridian.specified : timeValue.meridian != null;

				return timeValue;
			}
		}, {
			key: 'getValue',
			value: function getValue() {
				var value = this.props.value == null ? this.state.defaultValue : this.props.value;

				return value;
			}
		}, {
			key: 'renderHour',
			value: function renderHour(props) {
				return this.renderBox(props, 'hour');
			}
		}, {
			key: 'renderMinute',
			value: function renderMinute(props) {
				if (props.showMinute) {
					return this.renderBox(props, 'minute');
				}
			}
		}, {
			key: 'renderSecond',
			value: function renderSecond(props) {
				if (props.showSecond) {
					return this.renderBox(props, 'second');
				}
			}
		}, {
			key: 'renderMeridian',
			value: function renderMeridian(props) {
				if (props.withMeridian) {
					return this.renderBox(props, 'meridian');
				}
			}
		}, {
			key: 'prepareProps',
			value: function prepareProps(thisProps, state) {
				var props = (0, _objectAssign2.default)({}, thisProps);

				this.time = props.time = this.prepareTime(props, state);
				this.prepareStyles(props, state);

				return props;
			}
		}, {
			key: 'prepareStyles',
			value: function prepareStyles(props, state) {
				props.style = this.prepareStyle(props, state);
				props.separatorStyle = this.prepareSeparatorStyle(props, state);
				this.prepareArrowStyles(props, state);
				this.prepareHourStyles(props, state);
				this.prepareMinuteStyles(props, state);
				this.prepareSecondStyles(props, state);
				this.prepareMeridianStyles(props, state);
			}
		}, {
			key: 'prepareStyle',
			value: function prepareStyle(props, state) {
				return this.normalize((0, _objectAssign2.default)({}, props.defaultStyle, props.style));
			}
		}, {
			key: 'prepareSeparatorStyle',
			value: function prepareSeparatorStyle(props, state) {
				return this.normalize((0, _objectAssign2.default)({}, props.defaultSeparatorStyle, props.separatorStyle));
			}
		}, {
			key: 'prepareArrowStyles',
			value: function prepareArrowStyles(props, state) {
				props.arrowUpStyle = this.normalize((0, _objectAssign2.default)({}, props.defaultArrowStyle, props.defaultArrowUpStyle, props.arrowStyle, props.arrowUpStyle));
				props.arrowDownStyle = this.normalize((0, _objectAssign2.default)({}, props.defaultArrowStyle, props.defaultArrowDownStyle, props.arrowStyle, props.arrowDownStyle));
			}
		}, {
			key: 'prepareHourStyles',
			value: function prepareHourStyles(props, state) {
				props.hourStyle = this.prepareHourStyle(props, state);
				props.hourInputStyle = this.prepareHourInputStyle(props, state);
			}
		}, {
			key: 'prepareHourStyle',
			value: function prepareHourStyle(props, state) {
				return this.normalize((0, _objectAssign2.default)({}, props.defaultBoxStyle, props.defaultHourStyle, props.boxStyle, props.hourStyle));
			}
		}, {
			key: 'prepareHourInputStyle',
			value: function prepareHourInputStyle(props, state) {
				return this.normalize((0, _objectAssign2.default)({}, props.defaultInputStyle, props.defaultHourInputStyle, props.inputStyle, props.hourInputStyle));
			}
		}, {
			key: 'prepareMinuteStyles',
			value: function prepareMinuteStyles(props, state) {
				props.minuteStyle = this.prepareMinuteStyle(props, state);
				props.minuteInputStyle = this.prepareMinuteInputStyle(props, state);
			}
		}, {
			key: 'prepareMinuteStyle',
			value: function prepareMinuteStyle(props, state) {
				return this.normalize((0, _objectAssign2.default)({}, props.defaultBoxStyle, props.defaultMinuteStyle, props.boxStyle, props.minuteStyle));
			}
		}, {
			key: 'prepareMinuteInputStyle',
			value: function prepareMinuteInputStyle(props, state) {
				return this.normalize((0, _objectAssign2.default)({}, props.defaultInputStyle, props.defaultMinuteInputStyle, props.inputStyle, props.minuteInputStyle));
			}
		}, {
			key: 'prepareSecondStyles',
			value: function prepareSecondStyles(props, state) {
				if (props.showSecond) {
					props.secondStyle = this.prepareSecondStyle(props, state);
					props.secondInputStyle = this.prepareSecondInputStyle(props, state);
				}
			}
		}, {
			key: 'prepareSecondStyle',
			value: function prepareSecondStyle(props, state) {
				return this.normalize((0, _objectAssign2.default)({}, props.defaultBoxStyle, props.defaultSecondStyle, props.boxStyle, props.secondStyle));
			}
		}, {
			key: 'prepareSecondInputStyle',
			value: function prepareSecondInputStyle(props, state) {
				return this.normalize((0, _objectAssign2.default)({}, props.defaultInputStyle, props.defaultSecondInputStyle, props.inputStyle, props.secondInputStyle));
			}
		}, {
			key: 'prepareMeridianStyles',
			value: function prepareMeridianStyles(props, state) {
				if (props.withMeridian) {
					props.meridianStyle = this.prepareMeridianStyle(props, state);
					props.meridianInputStyle = this.prepareMeridianInputStyle(props, state);
				}
			}
		}, {
			key: 'prepareMeridianStyle',
			value: function prepareMeridianStyle(props, state) {
				return this.normalize((0, _objectAssign2.default)({}, props.defaultBoxStyle, props.defaultMeridianStyle, props.boxStyle, props.meridianStyle));
			}
		}, {
			key: 'prepareMeridianInputStyle',
			value: function prepareMeridianInputStyle(props, state) {
				return this.normalize((0, _objectAssign2.default)({}, props.defaultInputStyle, props.defaultMeridianInputStyle, props.inputStyle, props.meridianInputStyle));
			}
		}]);

		return TimePicker;
	}(_react2.default.Component);

	exports.default = TimePicker;


	TimePicker.defaultProps = {
		normalizeStyle: true,
		stopChangePropagation: true,

		//makes 15:78 be converted to 15:00, and not to 16:18
		strict: true,
		overflowHourToMeridian: true,

		step: 1,
		hourStep: null,
		minuteStep: null,
		secondStep: null,

		stepDelay: 60,
		showArrows: true,

		defaultStyle: {
			border: '1px solid gray',
			padding: 10,
			display: 'inline-flex',
			alignItems: 'center',
			boxSizing: 'border-box',
			flexFlow: 'row',
			width: 200
		},

		defaultArrowStyle: {
			cursor: 'pointer',
			userSelect: 'none',
			display: 'inline-block',
			alignSelf: 'stretch',
			textAlign: 'center'
		},

		defaultArrowOverStyle: {
			background: 'rgb(229, 229, 229)'
		},

		defaultArrowUpOverStyle: null,
		defaultArrowDownOverStyle: null,

		defaultArrowUpStyle: {
			marginBottom: 5
		},

		defaultArrowDownStyle: {
			marginTop: 5
		},

		defaultBoxStyle: {
			boxSizing: 'border-box',
			display: 'flex',
			flexFlow: 'column',
			alignItems: 'center'
		},

		defaultInputStyle: {
			boxSizing: 'border-box',
			width: '100%',
			textAlign: 'center'
		},

		defaultSeparatorStyle: {
			flex: 'none'
		},

		defaultMeridianInputStyle: {
			cursor: 'pointer'
		},

		defaultMeridianInputProps: {
			readOnly: true
		},

		// format: 'HHmmssa',
		renderHour: null,
		renderMinute: null,
		renderSecond: null,
		renderMeridian: null,

		defaultArrowFactory: _react2.default.DOM.span,

		arrowFactory: null,
		arrowUpFactory: null,
		arrowDownFactory: null,

		defaultInputFactory: _react2.default.DOM.input,
		inputFactory: null,

		hourInputFactory: null,
		minuteInputFactory: null,
		secondInputFactory: null,
		meridianInputFactory: null,

		timeToString: _formatTime2.default
	};

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	'use strict';

	function ToObject(val) {
		if (val == null) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}

		return Object(val);
	}

	module.exports = Object.assign || function (target, source) {
		var from;
		var keys;
		var to = ToObject(target);

		for (var s = 1; s < arguments.length; s++) {
			from = arguments[s];
			keys = Object.keys(Object(from));

			for (var i = 0; i < keys.length; i++) {
				to[keys[i]] = from[keys[i]];
			}
		}

		return to;
	};


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var hasOwn      = __webpack_require__(4)
	var getPrefixed = __webpack_require__(5)

	var map      = __webpack_require__(11)
	var plugable = __webpack_require__(12)

	function plugins(key, value){

		var result = {
			key  : key,
			value: value
		}

		;(RESULT.plugins || []).forEach(function(fn){

			var tmp = map(function(res){
				return fn(key, value, res)
			}, result)

			if (tmp){
				result = tmp
			}
		})

		return result
	}

	function normalize(key, value){

		var result = plugins(key, value)

		return map(function(result){
			return {
				key  : getPrefixed(result.key, result.value),
				value: result.value
			}
		}, result)

		return result
	}

	var RESULT = function(style){

		var k
		var item
		var result = {}

		for (k in style) if (hasOwn(style, k)){
			item = normalize(k, style[k])

			if (!item){
				continue
			}

			map(function(item){
				result[item.key] = item.value
			}, item)
		}

		return result
	}

	module.exports = plugable(RESULT)

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	'use strict';

	module.exports = function(obj, prop){
		return Object.prototype.hasOwnProperty.call(obj, prop)
	}


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var getStylePrefixed = __webpack_require__(6)
	var properties       = __webpack_require__(10)

	module.exports = function(key, value){

		if (!properties[key]){
			return key
		}

		return getStylePrefixed(key, value)
	}

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var toUpperFirst = __webpack_require__(7)
	var getPrefix    = __webpack_require__(8)
	var el           = __webpack_require__(9)

	var MEMORY = {}
	var STYLE
	var ELEMENT

	var PREFIX

	module.exports = function(key, value){

	    ELEMENT = ELEMENT || el()
	    STYLE   = STYLE   || ELEMENT.style

	    var k = key// + ': ' + value

	    if (MEMORY[k]){
	        return MEMORY[k]
	    }

	    var prefix
	    var prefixed

	    if (!(key in STYLE)){//we have to prefix

	        // if (PREFIX){
	        //     prefix = PREFIX
	        // } else {
	            prefix = getPrefix('appearance')

	        //     if (prefix){
	        //         prefix = PREFIX = prefix.toLowerCase()
	        //     }
	        // }

	        if (prefix){
	            prefixed = prefix + toUpperFirst(key)

	            if (prefixed in STYLE){
	                key = prefixed
	            }
	        }
	    }

	    MEMORY[k] = key

	    return key
	}

/***/ }),
/* 7 */
/***/ (function(module, exports) {

	'use strict';

	module.exports = function(str){
		return str?
				str.charAt(0).toUpperCase() + str.slice(1):
				''
	}

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var toUpperFirst = __webpack_require__(7)
	var prefixes     = ["ms", "Moz", "Webkit", "O"]

	var el = __webpack_require__(9)

	var ELEMENT
	var PREFIX

	module.exports = function(key){

		if (PREFIX !== undefined){
			return PREFIX
		}

		ELEMENT = ELEMENT || el()

		var i = 0
		var len = prefixes.length
		var tmp
		var prefix

		for (; i < len; i++){
			prefix = prefixes[i]
			tmp = prefix + toUpperFirst(key)

			if (typeof ELEMENT.style[tmp] != 'undefined'){
				return PREFIX = prefix
			}
		}

		return PREFIX
	}

/***/ }),
/* 9 */
/***/ (function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';

	var el

	module.exports = function(){

		if(!el && !!global.document){
		  	el = global.document.createElement('div')
		}

		if (!el){
			el = {style: {}}
		}

		return el
	}
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 10 */
/***/ (function(module, exports) {

	'use strict';

	module.exports = {
	  'alignItems': 1,
	  'justifyContent': 1,
	  'flex': 1,
	  'flexFlow': 1,
	  'flexGrow': 1,
	  'flexShrink': 1,
	  'flexBasis': 1,
	  'flexDirection': 1,
	  'flexWrap': 1,
	  'alignContent': 1,
	  'alignSelf': 1,

	  'userSelect': 1,
	  'transform': 1,
	  'transition': 1,
	  'transformOrigin': 1,
	  'transformStyle': 1,
	  'transitionProperty': 1,
	  'transitionDuration': 1,
	  'transitionTimingFunction': 1,
	  'transitionDelay': 1,
	  'borderImage': 1,
	  'borderImageSlice': 1,
	  'boxShadow': 1,
	  'backgroundClip': 1,
	  'backfaceVisibility': 1,
	  'perspective': 1,
	  'perspectiveOrigin': 1,
	  'animation': 1,
	  'animationDuration': 1,
	  'animationName': 1,
	  'animationDelay': 1,
	  'animationDirection': 1,
	  'animationIterationCount': 1,
	  'animationTimingFunction': 1,
	  'animationPlayState': 1,
	  'animationFillMode': 1,
	  'appearance': 1
	}


/***/ }),
/* 11 */
/***/ (function(module, exports) {

	'use strict';

	module.exports = function(fn, item){

		if (!item){
			return
		}

		if (Array.isArray(item)){
			return item.map(fn).filter(function(x){
				return !!x
			})
		} else {
			return fn(item)
		}
	}

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var getCssPrefixedValue = __webpack_require__(13)

	module.exports = function(target){
		target.plugins = target.plugins || [
			(function(){
				var values = {
					'flex':1,
					'inline-flex':1
				}

				return function(key, value){
					if (key === 'display' && value in values){
						return {
							key  : key,
							value: getCssPrefixedValue(key, value, true)
						}
					}
				}
			})()
		]

		target.plugin = function(fn){
			target.plugins = target.plugins || []

			target.plugins.push(fn)
		}

		return target
	}

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var getPrefix     = __webpack_require__(8)
	var forcePrefixed = __webpack_require__(14)
	var el            = __webpack_require__(9)

	var MEMORY = {}
	var STYLE
	var ELEMENT

	module.exports = function(key, value, force){

	    ELEMENT = ELEMENT || el()
	    STYLE   = STYLE   ||  ELEMENT.style

	    var k = key + ': ' + value

	    if (MEMORY[k]){
	        return MEMORY[k]
	    }

	    var prefix
	    var prefixed
	    var prefixedValue

	    if (force || !(key in STYLE)){

	        prefix = getPrefix('appearance')

	        if (prefix){
	            prefixed = forcePrefixed(key, value)

	            prefixedValue = '-' + prefix.toLowerCase() + '-' + value

	            if (prefixed in STYLE){
	                ELEMENT.style[prefixed] = ''
	                ELEMENT.style[prefixed] = prefixedValue

	                if (ELEMENT.style[prefixed] !== ''){
	                    value = prefixedValue
	                }
	            }
	        }
	    }

	    MEMORY[k] = value

	    return value
	}

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var toUpperFirst = __webpack_require__(7)
	var getPrefix    = __webpack_require__(8)
	var properties   = __webpack_require__(10)

	/**
	 * Returns the given key prefixed, if the property is found in the prefixProps map.
	 *
	 * Does not test if the property supports the given value unprefixed.
	 * If you need this, use './getPrefixed' instead
	 */
	module.exports = function(key, value){

		if (!properties[key]){
			return key
		}

		var prefix = getPrefix(key)

		return prefix?
					prefix + toUpperFirst(key):
					key
	}

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var parseTime      = __webpack_require__(16)
	var adjustOverflow = parseTime.adjustOverflow

	var defaults = {}

	function onInvalid(timeValue, config){

		timeValue.invalid.forEach(function(info){

			var name  = info.name
			var value = info.value * 1

			if (!isNaN(value)){
				timeValue[name] = value
			}
		})

		return adjustOverflow(timeValue, config)
	}

	module.exports = function(value, config){

		config = config || defaults

		value = value || ''

		if (typeof value == 'string'){
			value = parseTime(value, config)
		}

		var definedParts = {}

		if (value){

			config.withMeridian = value.meridian != null

			if (value.invalid){
				value.invalid.forEach(function(info){
					definedParts[info.name] = true
				})
			}

			if (!config.strict && value.invalid){
				value = onInvalid(value, config)
			}

			if (definedParts.hour){
				value.hour = value.hour || 0
			}

			if (definedParts.minute){
				value.minute = value.minute || 0
			}

			if (definedParts.second){
				value.second = value.second || 0
			}

			// value.hour   = value.hour || 0
			// value.minute = value.minute || 0
			// value.second = value.second || 0

			if (config.strict && value.meridian && value.hour === 12){
				if (value.minute !== undefined){
					value.minute = 0
				}
				if (value.second !== undefined){
					value.second = 0
				}
			}
		}

		var result = {
			hour  : value.hour
		}
		if (value.minute !== undefined){
			result.minute = value.minute
		}
		if (value.second !== undefined){
			result.second = value.second
		}

		if (config.withMeridian){
			result.meridian = value.meridian
		}

		return result
	}

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var assign = __webpack_require__(2)
	var defaults = __webpack_require__(17)

	function trim(str){
		return str.trim()
	}

	var validHour     = __webpack_require__(18)
	var validMinute   = __webpack_require__(20)
	var validSecond   = __webpack_require__(21)
	var validMeridian = __webpack_require__(22)

	function getHour(value, config){
		if (validHour(value, assign({}, config, config.hour))){
			return value * 1
		}
	}

	function getMinute(value, config){
		if (validMinute(value, assign({}, config, config.minute))){
			return value * 1
		}
	}

	function getSecond(value, config){
		if (validSecond(value, assign({}, config, config.second))){
			return value * 1
		}
	}

	function getMeridian(value, config){
		if (validMeridian(value, assign({}, config, config.meridian))){
			return value
		}
	}

	function hasMeridian(str){
		var parts = str.split(' ')

		return parts.length > 1
	}

	var GET_MAP = {
		hour    : getHour,
		minute  : getMinute,
		second  : getSecond,
		meridian: getMeridian
	}

	function get(name){
		return GET_MAP[name]
	}

	function parseLast(str, partName, config){
		config = assign({}, config, config? config[partName]: null)

		var withMeridian = config.meridian

		var parts = str.split(' ').map(trim)
		var getFn = get(partName)
		var result = {
			invalid: []
		}

		var partValue
		var meridian

		if (isValidPart(partName, parts[0], config)){
			if (getFn){
				partValue = getFn(parts[0], config)
			}
		} else {
			result.invalid.push({
				name: partName,
				value: parts[0]
			})
		}

		if (withMeridian){
			meridian = getMeridian(parts[1], config)

			if (meridian === undefined){
				result.invalid.push({
					name: 'meridian',
					value: parts[1]
				})
			}
		}

		if (meridian !== undefined){
			result.meridian = meridian
		}
		if (partValue !== undefined){
			result[partName] = partValue
		}

		return result
	}

	function PARSE(time, config){

		config = assign({}, defaults, config)

		var parts        = time.split(config.separator).map(trim)
		var withMeridian = hasMeridian(parts[parts.length - 1])

		config.meridian = withMeridian

		var invalids = []
		var result = {}
		var hour
		var minute

		if (parts.length > 3){
			return
		}

		if (parts.length == 1){
			//hh am
			assign(result, parseLast(parts[0], 'hour', config))
		}
		if (parts.length == 2){
			//hh:mm am
			hour = getHour(parts[0], config)
			if (hour === undefined){
				invalids.push({
					name: 'hour',
					value: parts[0]
				})
			}
			assign(result, parseLast(parts[1], 'minute', config))
		}
		if (parts.length == 3){
			//hh:mm:ss am
			hour   = getHour(parts[0], config)
			minute = getMinute(parts[1], config)

			if (hour === undefined){
				invalids.push({
					name: 'hour',
					value: parts[0]
				})
			}

			if (minute === undefined){
				invalids.push({
					name: 'minute',
					value: parts[1]
				})
			}

			assign(result, parseLast(parts[2], 'second', config))
		}

		if (result.invalid){
			invalids.push.apply(invalids, result.invalid)
			result.invalid = invalids
		}

		if (hour !== undefined){
			result.hour = hour
		}

		if (minute !== undefined){
			result.minute = minute
		}

		if (!result.invalid.length){
			delete result.invalid
		}

		return result
	}

	var isValidPart = __webpack_require__(23)
	var isValidTime = __webpack_require__(24)
	var updateTime  = __webpack_require__(25)
	var adjustOverflow  = __webpack_require__(26)

	PARSE.isValidPart    = isValidPart
	PARSE.isValidTime    = isValidTime
	PARSE.updateTime     = updateTime
	PARSE.adjustOverflow = adjustOverflow

	module.exports = PARSE

/***/ }),
/* 17 */
/***/ (function(module, exports) {

	'use strict';

	module.exports = {
		separator: ':',
		twoDigits: true
	}

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var validNumber = __webpack_require__(19)
	var assign      = __webpack_require__(2)

	module.exports = function validHour(value, config){
		config = assign({}, config)

		config.twoDigits = config.len == 2

		var meridian = config.meridian

		if (validNumber(value, config)){
			value *= 1

			if (meridian){
				return 0 <= value && value <= 12
			}

			return 0 <= value && value < 24
		}

		return false
	}

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var assign   = __webpack_require__(2)
	var defaults = __webpack_require__(17)

	module.exports = function validNumber(n, config){
		var valid = !isNaN(n * 1)

		if (config){
			config = assign({}, defaults, config)
		} else {
			config = defaults
		}

		if (valid && typeof n == 'string' && config.twoDigits){
			valid = n.length == 2
		}

		if (valid){
			n = n * 1
			valid = parseInt(n) === n
		}

		return valid
	}

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var validNumber = __webpack_require__(19)
	var assign      = __webpack_require__(2)

	module.exports = function validMinute(value, config){

		config = assign({}, config)
		config.twoDigits = config.len == 2

		if (validNumber(value, config)){
			value *= 1

			return 0 <= value && value < 60
		}

		return false
	}

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var validMinute = __webpack_require__(20)
	var assign      = __webpack_require__(2)

	module.exports = function validSecond(value, config){
		config = assign({}, config)
		config.twoDigits = config.len == 2

		return validMinute(value, config)
	}

/***/ }),
/* 22 */
/***/ (function(module, exports) {

	'use strict';

	module.exports = function validMeridian(value){
		if (!value){
			return false
		}

		value = value.toUpperCase()

		return value == 'AM' || value == 'PM'
	}

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var validHour     = __webpack_require__(18)
	var validMinute   = __webpack_require__(20)
	var validSecond   = __webpack_require__(21)
	var validMeridian = __webpack_require__(22)

	var VALIDATION_MAP = {
		hour    : validHour,
		minute  : validMinute,
		second  : validSecond,
		meridian: validMeridian
	}

	/**
	 * VALIDATES TIME PART [name, value] eg ['hour', '15']
	 *
	 * Returns whether the given value is valid for the given time part.
	 *
	 * EG:
	 * 	name: 'hour', value: 15 => true
	 * 	name: 'hour', value: '07' => true
	 *  name: 'hour', value: 15, config={meridian: true} => false
	 *
	 *  name: 'minute', value: '05' => true
	 *
	 *  name: 'second', value: 55 => true
	 *  name: 'second', value: 5 => true
	 *  name: 'second', value: '5' => false (string without two digits)
	 *  name: 'second', value: '5', {twoDigits: false} => true

	 *  name: 'meridian', value: 'PM' => true
	 *  name: 'meridian', value: 'am' => true
	 *  name: 'meridian', value: 'apm' => false
	 *
	 * @param {String} name
	 * @param {Number/String} value
	 * @param {Object} config
	 * @param {Boolean} config.meridian
	 * @param {Boolean} config.twoDigits
	 *
	 * @return {Boolean}
	 */
	module.exports = function isValidPart(name, value, config){
		var fn = VALIDATION_MAP[name]

		return !!(fn && fn(value, config))
	}

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var isValidPart = __webpack_require__(23)
	var assign = __webpack_require__(2)

	module.exports = function isValidTime(time, config){

		var validSecond = time.second === undefined || isValidPart('second', time.second, config)

		var validMinute = validSecond && (time.minute === undefined || isValidPart('minute', time.minute, config))
		var validHour   = validMinute && isValidPart('hour', time.hour, assign({meridian: time.meridian}, config))

		var meridian      = time.meridian
		var validMeridian = validHour && (meridian? isValidPart('meridian', meridian, config): true)

		var valid = validMeridian
		if (valid && meridian){
			//for 24 hour clock, we're done
			//BUT there is a special case when we have meridian specified:
			//12:00:00 am/pm is ok, but >= 12:00:01 is not
			var hour = time.hour * 1
			if (hour === 12){
				valid = time.minute * 1 === 0 && time.second * 1 === 0
			}
		}

		return valid
	}

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var assign      = __webpack_require__(2)
	var isValidNumber = __webpack_require__(19)
	var isValidPart = __webpack_require__(23)
	var isValidTime = __webpack_require__(24)
	var adjustOverflow = __webpack_require__(26)

	var clamp = __webpack_require__(27)

	/**
	 * @param {Object} time
	 * @param {String} name
	 * @param {String/Number} value
	 * @param {Object} [config]
	 * @param {Boolean} [config.clamp=false]
	 * @param {Boolean} [config.overflow=true]
	 * @param {Boolean} [config.rejectInvalid=false]
	 *
	 * @return {Object} time
	 */

	module.exports = function update(time, name, value, config){

		var initial = time
		var touched
		var validNumber = isValidNumber(value, config)
		var validPart   = isValidPart(name, value, config)

		time   = assign({}, time)
		config = config || {}

		if (validNumber){
			value *= 1
		}

		if (validPart || validNumber){
			time[name] = value
		}

		if (!isValidTime(time, config) && config.clamp){
			time[name] = clamp(time, name, time[name])
		}

		if (!isValidTime(time, config)){

			if (config.rejectInvalid){
				return initial
			}

			if (config.overflow !== false){
				time = adjustOverflow(time, config)
			}
		}

		return time
	}

/***/ }),
/* 26 */
/***/ (function(module, exports) {

	'use strict';

	/**
	 * See documentation below
	 */

	var defaults = {}

	var MAP = {
		hour: overflowHour,
		minute: overflowMinute,
		second: overflowSecond
	}

	function overflowHour(values, name, value, config){
		if (values.hour === undefined){
			return
		}

		var overflowHourToMeridian = !config || config.overflowHourToMeridian !== false
		var meridian = values.meridian || config && config.meridian === true
		var limit    = meridian? 12: 23
		var plusOne  = meridian? 12: 24

		var extra = 0

		if (value > limit){
			extra += Math.floor(value / limit)
			value = value % plusOne
		}
		if (value < 0){
			extra = Math.ceil(-value / limit)
			value = plusOne + value
		}

		if (meridian && value === limit && (values.minute > 0 || values.second > 0)){
			extra += 1
			value = 0
		}

		if (meridian && extra % 2 == 1 && overflowHourToMeridian){
			if (typeof meridian == 'string'){
				meridian = meridian.toUpperCase()
			}

			//change meridian
			values.meridian = meridian == 'PM'? 'AM': 'PM'
		}

		values.hour = value
	}

	function overflowMinuteOrSecond(values, name, value, config, nextName){

		if (values[name] === undefined){
			return
		}

		var extra = 0

		if (value > 59){
			extra += Math.floor(value / 60)
			value = value % 60
		}
		if (value < 0){
			extra -= Math.ceil(-value / 60)
			value = 60 + value
		}

		values[name || 'minute'] = value

		if (extra){
			values[nextName || 'hour'] += extra
		}
	}

	function overflowMinute(values, name, value, config){
		overflowMinuteOrSecond(values, 'minute', values.minute, config) // minute -> hour
		overflowHour(values, 'hour', values.hour, config) //overflow hour
	}

	function overflowSecond(values, name, value, config){
		overflowMinuteOrSecond(values, 'second', values.second, config, 'minute') //second -> minute
		overflowMinute(values, 'minute', values.minute, config) //minute -> hour
	}

	/**
	 *
	 * This method receives an object with hour, minute and second properties.
	 * It adjusts any overflowing values and moves the overflow to the next value:
	 *
	 * EG: extra seconds go to minute; extra minutes go to hour;
	 * hours beyond 23 (in 24 hour format, so without values.meridian specified) restart from 0,
	 * or beyond 12:00:00 (when meridian is specified) restart from 0
	 *
	 * @param  {Object} values [description]
	 * @param  {Number} values.hour
	 * @param  {Number} values.minute
	 * @param  {Number} values.second
	 * @param  {Number} values.meridian
	 *
	 * @param  {String} [name="second"]   "hour"|"minute"|"second"
	 * @param  {Number} [value]
	 * @param  {Object} config
	 *
	 * Both {name} and {value} are optional. If not given, they default to "second" and value for second.
	 *
	 * @return {Object}
	 */
	module.exports = function(values, name, value, config){

		if (arguments.length == 2){
			config = name
			name   = 'second'
			value  = values[name]
		}

		MAP[name](values, name, value, config || defaults)

		return values
	}

/***/ }),
/* 27 */
/***/ (function(module, exports) {

	'use strict';

	module.exports = function clamp(time, name, value){
		if (name == 'meridian'){
			return value
		}
		if (name == 'hour'){
			var limit = 24

			if (time.meridian){
				limit = (time.hour || time.minute)? 11: 12
			}

			return value < 0?
					0:
					value > limit?
						limit:
						value
		}

		return value < 0?
					0:
					value > 59?
						59:
						value
	}

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var update = __webpack_require__(16).updateTime

	module.exports = function(time, name, value, config){
		time = update(time, name, value, config)

		return time
	}

/***/ }),
/* 29 */
/***/ (function(module, exports) {

	'use strict';

	module.exports = function(str){
		return str?
				str.charAt(0).toUpperCase() + str.slice(1):
				''
	}

/***/ }),
/* 30 */
/***/ (function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {module.exports = 'ontouchstart' in global || (global.DocumentTouch && document instanceof DocumentTouch)
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(30)?
		{
			onMouseDown: 'onTouchStart',
			onMouseUp  : 'onTouchEnd',
			onMouseMove: 'onTouchMove'
		}:
		{
			onMouseDown: 'onMouseDown',
			onMouseUp  : 'onMouseUp',
			onMouseMove: 'onMouseMove'
		}

/***/ }),
/* 32 */
/***/ (function(module, exports) {

	'use strict';


	module.exports = function twoDigits(value){
		return value < 10?
				'0' + value:
				value
	}

/***/ }),
/* 33 */
/***/ (function(module, exports) {

	'use strict';

		function getHourInfo(format, value){
			var len = 1
			var specified = false

			var index = format.indexOf('h')

			if (~index){
				specified = true
				if (format.charAt(index + 1) == 'h'){
					len++
				}
			} else {
				index = format.indexOf('H')
				if (~index){
					specified = true
					if (format.charAt(index + 1) == 'H'){
						len++
					}
				}
			}

			return {
				len: len,
				specified: specified
			}
		}

		function getMinuteInfo(format, value){
			var len = 1
			var specified = false
			var index = format.indexOf('m')

			if (~index){
				specified =  true
				if (format.charAt(index+1) == 'm'){
					len++
				}
			}

			return {
				len: len,
				specified: specified
			}
		}

		function getSecondInfo(format, value){
			var len = 1
			var specified = false
			var index = format.indexOf('s')

			if (~index){
				specified = true
				if (format.charAt(index+1) == 's'){
					len++
				}
			}

			return {
				len: len,
				specified: specified
			}
		}

		function isMeridianUpperCase(format, value){
			var uppercase = true
			var specified = false
			var index = format.indexOf('a')

			if (~index){
				specified = true
				uppercase = false
			} else if (~format.indexOf('A')){
				specified = true
			}

			return {
				uppercase: uppercase,
				lowercase: !uppercase,
				specified: specified
			}
		}

	module.exports = function(format){

		if (typeof format != 'string'){
			return {
				hour    : {specified: false},
				minute  : {specified: false},
				second  : {specified: false},
				meridian: {specified: false}
			}
		}

		return {
			hour    : getHourInfo(format),
			minute  : getMinuteInfo(format),
			second  : getSecondInfo(format),
			meridian: isMeridianUpperCase(format)
		}
	}


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var twoDigits     = __webpack_require__(32)
	var getFormatInfo = __webpack_require__(33)

	module.exports = function(name, value, formatOrInfo){

		var formatInfo = formatOrInfo

		if (!formatInfo || !formatInfo.hour || typeof formatInfo == 'string'){
			formatInfo = getFormatInfo(formatInfo)
		}

		if (!formatInfo){
			return
		}

		var info = formatInfo[name]

		if (value && name === 'meridian' && info.specified){
			return info.uppercase? value.toUpperCase(): value.toLowerCase()
		}

		return info.specified?
					info.len == 2?
						twoDigits(value):
						value
					:
					''
	}

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var twoDigits      = __webpack_require__(32)
	var getFormatInfo  = __webpack_require__(33)
	var formatFunction = __webpack_require__(34)

	function identity(x){
		return x
	}

	module.exports = function(time, format){

		var hourFormat     = twoDigits
		var minuteFormat   = twoDigits
		var secondFormat   = twoDigits
		var meridianFormat = identity

		if (format){
			var formatInfo = typeof format == 'string'? getFormatInfo(format): format

			if (formatInfo.hour.specified){
				hourFormat = function(){
					return formatFunction('hour', time.hour, formatInfo)
				}
			}

			if (formatInfo.minute.specified){
				minuteFormat = function(){
					return formatFunction('minute', time.minute, formatInfo)
				}
			}

			if (formatInfo.second.specified){
				secondFormat = function(){
					return formatFunction('second', time.second, formatInfo)
				}
			}

			if (formatInfo.meridian.specified){
				meridianFormat = function(){
					return formatFunction('meridian', time.meridian, formatInfo)
				}
			}
		}

		var result = []

		if (time.hour != null){
			result.push(hourFormat(time.hour))
		}

		if (time.minute != null){
		 	result.push(minuteFormat(time.minute))
		}

		if (time.second != null){
			result.push(secondFormat(time.second))
		}

		var str = result.join(':')

		if (time.meridian){
			str += ' ' + meridianFormat(time.meridian)
		}

		return str
	}

/***/ })
/******/ ])
});
;