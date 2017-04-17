'use strict';

var React       = require('react')
var assign      = require('object-assign')
var normalize   = require('react-style-normalizer')

var parseTime    = require('./parseTime')
var updateTime   = require('./updateTime')
var toUpperFirst = require('./toUpperFirst')

var hasTouch = require('has-touch')

var EVENT_NAMES = require('react-event-names')

var WHITESPACE = '\u00a0'

function emptyFn(){}

var twoDigits     = require('./twoDigits')
var getFormatInfo = require('./getFormatInfo')
var format        = require('./format')
var formatTime    = require('./formatTime')

function identity(v){ return v }

export default var ____Class0=React.Component;for(var ____Class0____Key in ____Class0){if(____Class0.hasOwnProperty(____Class0____Key)){TimePicker[____Class0____Key]=____Class0[____Class0____Key];}}var ____SuperProtoOf____Class0=____Class0===null?null:____Class0.prototype;TimePicker.prototype=Object.create(____SuperProtoOf____Class0);TimePicker.prototype.constructor=TimePicker;TimePicker.__superConstructor__=____Class0;function TimePicker(){if(____Class0!==null){____Class0.apply(this,arguments);}}

	TimePicker.prototype.componentWillUnmount=function() {
		this.stopInterval()
	};

	TimePicker.prototype.getInitialState=function() {
		return {
			defaultValue: this.props.defaultValue,
			focused: {
				hour    : null,
				minute  : null,
				second  : null,
				meridian: null
			},
			overArrow: {
				hour: null,
				minute: null,
				second: null,
				meridian: null
			}
		}
	};

	TimePicker.prototype.getDefaultProps=function() {
		return {
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
				boxSizing : 'border-box',
				display   : 'flex',
				flexFlow  : 'column',
				alignItems: 'center'
			},

			defaultInputStyle: {
				boxSizing: 'border-box',
				width    : '100%',
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

			defaultArrowFactory: React.DOM.span,

			arrowFactory: null,
			arrowUpFactory: null,
			arrowDownFactory: null,

			defaultInputFactory: React.DOM.input,
			inputFactory: null,

			hourInputFactory: null,
			minuteInputFactory: null,
			secondInputFactory: null,
			meridianInputFactory: null,

			timeToString: formatTime
		}
	};

	TimePicker.prototype.normalize=function(style) {
		return normalize(style)
	};

	TimePicker.prototype.render=function() {
		var props = this.prepareProps(this.props, this.state)

		if (!props.normalizeStyle){
			this.normalize = identity
		}

		var hour     = this.renderHour(props)
		var minute   = this.renderMinute(props)
		var second   = this.renderSecond(props)
		var meridian = this.renderMeridian(props)

		var separator       = props.separator || React.createElement("span", {style: props.separatorStyle}, WHITESPACE + ':' + WHITESPACE)
		var hourSeparator   = hour && (minute || second || meridian)? props.hourSeparator || separator: null
		var minuteSeparator = minute && (second || meridian)? props.minuteSeparator || separator: null
		var secondSeparator = (second && meridian)? props.secondSeparator || separator: null


		return React.createElement("div", React.__spread({},  props), 
			hour, 
			hourSeparator, 
			minute, 
			minuteSeparator, 
			second, 
			secondSeparator, 
			meridian
		)
	};

	TimePicker.prototype.onArrowMouseEnter=function(props, dir, name, event) {
		var overArrow = this.state.overArrow

		Object.keys(overArrow).forEach(function(key){
			overArrow[key] = null
		})

		overArrow[name] = dir

		this.setState({})
	};

	TimePicker.prototype.onArrowMouseLeave=function(props, dir, name, event) {
		this.state.overArrow[name] = null

		this.setState({})
	};

	TimePicker.prototype.onArrowMouseDown=function(props, dir, name, event) {
		if (name == 'meridian'){
			this.onArrowMeridianAction(props, dir, name)
			return
		}

		var target = hasTouch?
		                event.target:
		                window
		var eventName = hasTouch?
							'touchend':
							'click'

		target.addEventListener(eventName, this.onWindowClick)

		this.onArrowAction(props, dir, name)

		this.timeoutId = setTimeout(function(){
			this.startInterval(props, dir, name)
		}.bind(this), props.stepDelay)
	};

	TimePicker.prototype.onWindowClick=function(){
		this.stopInterval()
	};

	TimePicker.prototype.stopInterval=function() {
		clearTimeout(this.timeoutId)
		clearInterval(this.intervalId)
	};

	TimePicker.prototype.startInterval=function(props, dir, name) {
		this.intervalId = setInterval(function() {
			this.onArrowAction(props, dir, name)
		}.bind(this), props.stepDelay)
	};

	TimePicker.prototype.onMeridianInputMouseDown=function(props, event){
		event.preventDefault()
		this.onArrowMeridianAction(props, 1, 'meridian')
	};

	TimePicker.prototype.onArrowMeridianAction=function(props, dir, name) {
		var currentMeridian = this.time.meridian
		var lowercase = currentMeridian == 'am' || currentMeridian == 'pm'

		var newValue = lowercase?
							currentMeridian == 'am'? 'pm': 'am'
							:
							currentMeridian == 'AM'? 'PM': 'AM'

		this.updateValue(name, newValue)
	};

	TimePicker.prototype.onArrowAction=function(props, dir, name) {
		var dirName = dir == 1? 'Up': 'Down'
		var methodName = 'onArrow' + dirName + toUpperFirst(name) + 'Action'

		if (typeof this[methodName] == 'function'){
			this[methodName](props)
		}

		methodName = 'onArrow' + toUpperFirst(name) + 'Action'

		if (typeof this[methodName] == 'function'){
			this[methodName](props, dir)
		}

		this.incValue(props, name, dir)
	};

	TimePicker.prototype.incValue=function(props, name, dir) {
		dir = dir || 0

		var step     = props[name + 'Step'] || props.step
		var amount   = dir * step
		var time     = this.time
		var oldValue = time[name]
		var newValue = oldValue + amount

		// this.setValue(time)
		this.updateValue(name, newValue)
	};

	TimePicker.prototype.updateValue=function(name, newValue, config) {
		this.setValue(this.updateTime(name, newValue, config))
	};

	TimePicker.prototype.updateTime=function(name, newValue, config) {
		config = config || {}
		config.overflowHourToMeridian = this.props.overflowHourToMeridian

		var time = this.time

		time = updateTime(time, name, newValue, config)

		return this.time = time
	};

	TimePicker.prototype.setValue=function(time) {
		if (this.props.value == null) {
			this.setState({
				defaultValue: time
			})
		}

		;(this.props.onChange || emptyFn)(this.props.timeToString(time, this.props.format), assign({}, time))
	};

	TimePicker.prototype.format=function(props, name, value) {
		var renderFn

		if (arguments.length < 3){
			value = props.time[name]
		}

		if (name != 'meridian'){
			renderFn = props['render' + toUpperFirst(name)]
		} else {
			renderFn = props.renderMeridian
		}

		if (!renderFn && typeof props.format == 'string'){
			var formatInfo = this.formatInfo
			renderFn = function(value, name){
				return format(name, value, formatInfo)
			}
		}

		if (!renderFn){
			renderFn = twoDigits
		}

		if (typeof renderFn == 'function'){
			value = renderFn(value, name, props)
		}

		return value
	};

	TimePicker.prototype.renderBox=function(props, name) {
		var state = this.state
		var style      = props[name + 'Style']
		var inputStyle = props[name + 'InputStyle']
		var upperName  = toUpperFirst(name)

		var value

		if (!state.focused[name]){
			value = this.format(props, name)
		} else {
			value = state.focused[name].value
		}

		var arrowUp
		var arrowDown

		if (props.showArrows){
			var overArrow = this.state.overArrow[name]

			var arrowUpStyle = props.arrowUpStyle

			if (overArrow == 1){
				arrowUpStyle = assign({},
									props.arrowUpStyle,
									props.defaultArrowOverStyle,
									props.defaultArrowUpOverStyle,
									props.arrowOverStyle,
									props.arrowUpOverStyle
								)
			}

			var arrowUpProps = {
				mouseOver: overArrow == 1,
				style    : arrowUpStyle,
				children : '▲'
			}

			arrowUpProps[EVENT_NAMES.onMouseDown] = this.onArrowMouseDown.bind(this, props, 1, name)
			arrowUpProps.onMouseEnter = this.onArrowMouseEnter.bind(this, props, 1, name)
			arrowUpProps.onMouseLeave = this.onArrowMouseLeave.bind(this, props, 1, name)

			var arrowDownStyle = props.arrowDownStyle

			if (overArrow == -1){
				arrowDownStyle = assign({},
									props.arrowDownStyle,
									props.defaultArrowOverStyle,
									props.defaultArrowDownOverStyle,
									props.arrowOverStyle,
									props.arrowDownOverStyle
								)
			}

			var arrowDownProps = {
				mouseOver: overArrow == -1,
				style    : arrowDownStyle,
				children : '▼'
			}

			arrowDownProps[EVENT_NAMES.onMouseDown] = this.onArrowMouseDown.bind(this, props, -1, name)
			arrowDownProps.onMouseEnter = this.onArrowMouseEnter.bind(this, props, -1, name)
			arrowDownProps.onMouseLeave = this.onArrowMouseLeave.bind(this, props, -1, name)

			var defaultArrowFactory = props.defaultArrowFactory
			var arrowUpFactory = props.arrowUpFactory || props.arrowFactory || defaultArrowFactory
			var arrowDownFactory = props.arrowDownFactory || props.arrowFactory || defaultArrowFactory

			arrowUp = arrowUpFactory(arrowUpProps)

			if (arrowUp === undefined){
				arrowUp = defaultArrowFactory(arrowUpProps)
			}

			arrowDown = arrowDownFactory(arrowDownProps)
			if (arrowDown === undefined){
				arrowDown = defaultArrowFactory(arrowDownProps)
			}
		}

		var defaultInputFactory = props.defaultInputFactory
		var inputFactory = props[name + 'InputFactory'] || props.inputFactory || defaultInputFactory

		var defaultInputProps = props['default' + upperName + 'InputProps']
		var inputProps        = props[name + 'InputProps']

		var inputProps = assign({}, props.inputProps, defaultInputProps, inputProps, {
			timeName: name,
			style   : inputStyle,
			value   : value,
      onBlur  : this.handleInputBlur.bind(this, props, name),
      onChange: this.handleInputChange.bind(this, props, name),
      onFocus : this.handleInputFocus.bind(this, props, name),
      onKeyUp : this.handleInputKeyUp.bind(this, props, name)
		})

		if (name == 'meridian'){
			inputProps.onMouseDown = this.onMeridianInputMouseDown.bind(this, props)
		}

		var input = inputFactory(inputProps)

		if (input === undefined){
			input = defaultInputFactory(inputProps)
		}


		return React.createElement("div", {style: style}, 
			arrowUp, 
			input, 
			arrowDown
		)
	};

	TimePicker.prototype.handleInputFocus=function(props, name, event) {
		var focused = this.state.focused

		focused[name] = {
			value: this.format(props, name)
		}

		this.stopInterval()

		this.setState({})
	};

	TimePicker.prototype.handleInputBlur=function(props, name, event) {

		this.state.focused[name] = null
		this.setState({})

		var time
		var value = event.target.value * 1

		this.updateValue(name, value, {
			clamp: props.clamp
		})
	};

	TimePicker.prototype.handleInputChange=function(props, name, event) {
		if (this.state.focused[name]){
			this.state.focused[name].value = event.target.value
		}

		this.setState({})
		props.stopChangePropagation && event.stopPropagation()
  };

  TimePicker.prototype.handleInputKeyUp=function(props, name, event) {
    if (event.key === 'ArrowDown') {
      this.incValue(props, name, -1);
    }
    if (event.key === 'ArrowUp') {
      this.incValue(props, name, 1);
    }
    this.setState({focused: {}})
  };

	TimePicker.prototype.getTime=function() {
		var strict = this.props.strict

		var formatInfo = this.formatInfo = getFormatInfo(this.props.format)

		return parseTime(this.getValue(), {
			strict: strict,

			hour    : formatInfo.hour,
			minute  : formatInfo.minute,
			second  : formatInfo.second,
			meridian: formatInfo.meridian
		})
	};

	TimePicker.prototype.prepareTime=function(props, state) {
		var timeValue  = this.getTime()
		var formatInfo = this.props.format?
							this.formatInfo:
							null

		props.showSecond = formatInfo?
								formatInfo.second.specified:
								timeValue.second !== undefined

		props.showMinute = formatInfo?
								formatInfo.minute.specified:
								timeValue.minute !== undefined

		props.withMeridian = formatInfo?
								formatInfo.meridian.specified:
								timeValue.meridian != null

		return timeValue
	};

	TimePicker.prototype.getValue=function() {
	    var value = this.props.value == null?
	                    this.state.defaultValue:
	                    this.props.value

	    return value
	};

	TimePicker.prototype.renderHour=function(props) {
		return this.renderBox(props, 'hour')
	};

	TimePicker.prototype.renderMinute=function(props) {
		if (props.showMinute){
			return this.renderBox(props, 'minute')
		}
	};

	TimePicker.prototype.renderSecond=function(props) {
		if (props.showSecond){
			return this.renderBox(props, 'second')
		}
	};

	TimePicker.prototype.renderMeridian=function(props) {
		if (props.withMeridian){
			return this.renderBox(props, 'meridian')
		}
	};

	TimePicker.prototype.prepareProps=function(thisProps, state) {
		var props = assign({}, thisProps)

		this.time = props.time = this.prepareTime(props, state)
		this.prepareStyles(props, state)

		return props
	};

	TimePicker.prototype.prepareStyles=function(props, state) {

		props.style = this.prepareStyle(props, state)
		props.separatorStyle = this.prepareSeparatorStyle(props, state)
		this.prepareArrowStyles(props, state)

		this.prepareHourStyles(props, state)
		this.prepareMinuteStyles(props, state)
		this.prepareSecondStyles(props, state)
		this.prepareMeridianStyles(props, state)

	};

	TimePicker.prototype.prepareStyle=function(props, state) {
		return this.normalize(assign({}, props.defaultStyle, props.style))
	};

	TimePicker.prototype.prepareSeparatorStyle=function(props, state) {
		return this.normalize(assign({}, props.defaultSeparatorStyle, props.separatorStyle))
	};

	TimePicker.prototype.prepareArrowStyles=function(props, state) {
		props.arrowUpStyle = this.normalize(assign({}, props.defaultArrowStyle, props.defaultArrowUpStyle, props.arrowStyle, props.arrowUpStyle))
		props.arrowDownStyle = this.normalize(assign({}, props.defaultArrowStyle, props.defaultArrowDownStyle, props.arrowStyle, props.arrowDownStyle))
	};

	TimePicker.prototype.prepareHourStyles=function(props, state) {
		props.hourStyle = this.prepareHourStyle(props, state)
		props.hourInputStyle = this.prepareHourInputStyle(props, state)
	};

	TimePicker.prototype.prepareHourStyle=function(props, state) {
		return this.normalize(assign({}, props.defaultBoxStyle, props.defaultHourStyle, props.boxStyle, props.hourStyle))
	};

	TimePicker.prototype.prepareHourInputStyle=function(props, state) {
		return this.normalize(assign({}, props.defaultInputStyle, props.defaultHourInputStyle, props.inputStyle, props.hourInputStyle))
	};

	TimePicker.prototype.prepareMinuteStyles=function(props, state) {
		props.minuteStyle = this.prepareMinuteStyle(props, state)
		props.minuteInputStyle = this.prepareMinuteInputStyle(props, state)
	};

	TimePicker.prototype.prepareMinuteStyle=function(props, state) {
		return this.normalize(assign({}, props.defaultBoxStyle, props.defaultMinuteStyle, props.boxStyle, props.minuteStyle))
	};

	TimePicker.prototype.prepareMinuteInputStyle=function(props, state) {
		return this.normalize(assign({}, props.defaultInputStyle, props.defaultMinuteInputStyle, props.inputStyle, props.minuteInputStyle))
	};

	TimePicker.prototype.prepareSecondStyles=function(props, state) {
		if (props.showSecond){
			props.secondStyle = this.prepareSecondStyle(props, state)
			props.secondInputStyle = this.prepareSecondInputStyle(props, state)
		}
	};

	TimePicker.prototype.prepareSecondStyle=function(props, state) {
		return this.normalize(assign({}, props.defaultBoxStyle, props.defaultSecondStyle, props.boxStyle, props.secondStyle))
	};

	TimePicker.prototype.prepareSecondInputStyle=function(props, state) {
		return this.normalize(assign({}, props.defaultInputStyle, props.defaultSecondInputStyle, props.inputStyle, props.secondInputStyle))
	};

	TimePicker.prototype.prepareMeridianStyles=function(props, state) {
		if (props.withMeridian){
			props.meridianStyle = this.prepareMeridianStyle(props, state)
			props.meridianInputStyle = this.prepareMeridianInputStyle(props, state)
		}
	};

	TimePicker.prototype.prepareMeridianStyle=function(props, state) {
		return this.normalize(assign({}, props.defaultBoxStyle, props.defaultMeridianStyle, props.boxStyle, props.meridianStyle))
	};

	TimePicker.prototype.prepareMeridianInputStyle=function(props, state) {
		return this.normalize(assign({}, props.defaultInputStyle, props.defaultMeridianInputStyle, props.inputStyle, props.meridianInputStyle))
	};
